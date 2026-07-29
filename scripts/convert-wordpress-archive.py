#!/usr/bin/env python3
"""
Bobby Albert blog: WordPress REST API archive -> Astro content collection Markdown.

Merges the bobbyalbert.com and valuesdrivenculture.com archives (same site,
rebranded). BA is primary (clean bodies, no CTA cruft); VDC contributes its
4 unique posts. pubDate = min(BA, VDC) per slug, since republishing only ever
moves a date forward.
"""
import json, glob, os, re, html, subprocess, sys, collections
from datetime import datetime

BA = "wp/Bobby Albert/BA Website Archive/bobbyalbert.wpenginepowered.com/wp-json/wp/v2"
VD = "wp/VDC/VDC Website Archive/valuesdrivenculture.com/wp-json/wp/v2"
OUT = "out/blog"
SKIP_CATEGORIES = {"Podcasts", "Interviews"}

# Lead2Grow podcast episodes are NOT reliably categorised — 32 of them carry
# only the "Leadership" category and slip past SKIP_CATEGORIES. Their titles
# are always "<episode number>: <title> w/ <guest>". Match on that.
# NB: must not catch legitimate listicles ("10 Ways to...", "3 Questions...") —
# those have no colon after the number, which is what makes this safe.
EPISODE_TITLE = re.compile(r"^\s*\d+\s*:\s")
ORIGIN = "https://bobbyalbert.com"


def load_posts(base):
    out = {}
    for p in glob.glob(base + "/posts/*.json"):
        d = json.load(open(p))
        if isinstance(d, list):
            d = d[0] if d else None
        if d and d.get("status") == "publish":
            out[d["slug"]] = d
    return out


def load_cats(base):
    out = {}
    for p in glob.glob(base + "/categories/*.json"):
        d = json.load(open(p))
        if isinstance(d, list):
            d = d[0] if d else None
        if d:
            out[d["id"]] = d.get("name")
    return out


# ---------- content cleaning ----------

CTA_MARKERS = [
    "ck.page", "kit.com", "Register Today", "convertkit",
    "values-driven-leadership-llc",
]

def strip_cta(hx):
    """Remove trailing marketing/opt-in blocks baked into post bodies."""
    if not hx:
        return hx
    # Split into top-level blocks and drop trailing ones that are pure CTA.
    blocks = re.split(r'(?=<(?:p|div|h[1-6]|figure|ul|ol|blockquote)[ >])', hx)
    while blocks:
        tail = blocks[-1]
        plain = re.sub(r"<[^>]+>", " ", tail)
        if any(m.lower() in tail.lower() for m in CTA_MARKERS) or \
           re.search(r'\b(FREE Resource|\$\d+ Value|Register Today|Sign up below|Click here to (get|download))\b', plain, re.I):
            blocks.pop()
            continue
        break
    return "".join(blocks)


# Every hostname this site was ever served from.
SITE_HOSTS = (
    r"(?:www\.)?(?:"
    r"bobbyalbert\.com"
    r"|bobbyalbert\.wpengine\.com"
    r"|bobbyalbert\.wpenginepowered\.com"
    r"|oninassessment\.bobbyalbert\.wpengine\.com"
    r"|valuesdrivenculture\.com"
    r"|valuesdriven1\.wpengine\.com"
    r")"
)

# Presentational attributes that must not survive into Markdown.
JUNK_ATTRS = re.compile(
    r'\s(?:srcset|sizes|width|height|loading|decoding|fetchpriority'
    r'|id|class|style|aria-[a-z-]+|data-[a-z0-9-]+)="[^"]*"', re.I
)


def rewrite_html(hx, known_slugs):
    """Rewrite internal links to site-relative; mark uploads for local copy."""
    if not hx:
        return hx, set()
    used = set()

    # 1. Drop presentational/lazy-load attributes before pandoc sees them.
    hx = JUNK_ATTRS.sub("", hx)

    # 2. Rewrite EVERY uploads URL regardless of which attribute holds it.
    def upload_sub(m):
        rel = m.group("rel")
        used.add(rel)
        return "/images/" + rel

    hx = re.sub(
        r"https?://[a-z0-9.-]+/wp-content/uploads/(?P<rel>[^\s\"'?#)]+)",
        upload_sub, hx, flags=re.I,
    )

    # 3. Internal post links -> site-relative, preserving #fragments.
    def link_sub(m):
        slug, frag = m.group("slug"), m.group("frag") or ""
        if slug in known_slugs:
            return f"/blog/{slug}/{frag}"
        return m.group(0)

    hx = re.sub(
        r"https?://" + SITE_HOSTS + r"/(?P<slug>[a-z0-9_-]+)/?(?P<frag>#[^\s\"')]*)?",
        link_sub, hx, flags=re.I,
    )

    # 3b. WordPress wraps images in an anchor back to the post itself.
    #     Pointless on the destination site — unwrap, keep the <img>.
    hx = re.sub(r'<a\b[^>]*>\s*(<img\b[^>]*/?>)\s*</a>', r"\1", hx, flags=re.I)

    # 4. Anything still pointing at the old site is a dead landing page /
    #    lead-magnet download (47 distinct targets, none of them posts).
    #    Unwrap the anchor, keep the text: a dead link is worse than plain text.
    dead = re.compile(
        r'<a\b[^>]*href="https?://' + SITE_HOSTS + r'[^"]*"[^>]*>(.*?)</a>',
        re.I | re.S,
    )
    prev = None
    while prev != hx:                      # nested anchors are rare but possible
        prev, hx = hx, dead.sub(r"\1", hx)
    return hx, used


def html_to_md(hx):
    r = subprocess.run(
        ["pandoc", "-f", "html", "-t", "markdown-smart", "--wrap=none"],
        input=hx, capture_output=True, text=True,
    )
    md = r.stdout
    md = re.sub(r'\{width="[^"]*"\s*height="[^"]*"\}', "", md)
    md = re.sub(r"\{[^}\n]*\}", lambda m: "" if "width=" in m.group(0) or "height=" in m.group(0) else m.group(0), md)
    # Empty structural wrappers pandoc passes through as raw HTML.
    md = re.sub(r"^\s*</?div[^>]*>\s*$", "", md, flags=re.M)
    md = re.sub(r"^\s*</?(?:span|section)[^>]*>\s*$", "", md, flags=re.M)
    # Pandoc separates adjacent lists with an empty HTML comment wrapped in a
    # raw-html fence. Astro renders that fence as a literal code block — big
    # black boxes mid-article. Every {=html} block in this corpus is exactly
    # this separator (verified: 1047/1047), and the corpus has no other fenced
    # code, so removing them wholesale is safe. Dropping the separator also
    # lets adjacent ordered lists merge and number continuously, which is what
    # the original post intended.
    md = re.sub(r"```\{=html\}\s*\n\s*<!--\s*-->\s*\n```[ \t]*\n?", "", md)
    md = re.sub(r"^\s*<!--\s*-->\s*$\n?", "", md, flags=re.M)

    md = re.sub(r"^\\\s*$", "", md, flags=re.M)   # stray pandoc hard-breaks
    md = indented_quotes_to_blockquotes(md)
    md = re.sub(r"\n{3,}", "\n\n", md)
    return md.strip()


LIST_ITEM = re.compile(r"^\s*(?:[-*+]|\d+[.)])\s")


def indented_quotes_to_blockquotes(md):
    """Rescue pull-quotes that Markdown would render as code blocks.

    WordPress styled callouts as indented text; pandoc preserves the 4-space
    indent, and Markdown then treats it as an indented code block — the reader
    sees Bobby's pull-quote in a black monospace box. This corpus contains no
    real code, so any such block is a quote.

    Only convert when the nearest preceding non-blank line is ordinary prose.
    An indented line following a list item is a legitimate list continuation
    and must be left alone.
    """
    lines = md.split("\n")
    out = []
    for i, line in enumerate(lines):
        if re.match(r"^ {4,}\S", line) and not LIST_ITEM.match(line):
            prev = next((lines[j] for j in range(i - 1, -1, -1) if lines[j].strip()), "")
            # A preceding blockquote is fine — an indented line after one is a
            # continuation of the same pull-quote, not a list continuation.
            if prev and not LIST_ITEM.match(prev) and not prev.startswith("    "):
                out.append("> " + line.strip())
                continue
        out.append(line)
    return "\n".join(out)


def clean_text(s):
    s = html.unescape(s or "")
    s = re.sub(r"<[^>]+>", "", s)
    return re.sub(r"\s+", " ", s).strip()


def yaml_str(s):
    return '"' + (s or "").replace("\\", "\\\\").replace('"', '\\"') + '"'


def main():
    ba, vd = load_posts(BA), load_posts(VD)
    cats = {**load_cats(VD), **load_cats(BA)}
    known = set(ba) | set(vd)

    merged = {}
    for slug in known:
        a, b = ba.get(slug), vd.get(slug)
        rec = a or b                      # BA body preferred
        dates = [r["date"] for r in (a, b) if r]
        rec = dict(rec)
        rec["_pubdate"] = min(dates)      # earliest = true original
        rec["_src"] = "BA" if a else "VDC"
        merged[slug] = rec

    # `modified` is dominated by bulk site migrations (54 posts share
    # 2017-07-19, 33 share 2021-01-14). Surfacing those as "updated" would
    # falsely age Bobby's 2014 writing. Only trust a modified date that is
    # NOT shared across posts — a genuine one-off edit.
    bulk_dates = {
        d for d, n in collections.Counter(
            (r.get("modified") or "")[:10] for r in merged.values()
        ).items() if n >= 3
    }

    os.makedirs(OUT, exist_ok=True)
    written = skipped = 0
    skipped_list, images_used = [], set()
    manifest = []

    for slug, r in sorted(merged.items(), key=lambda kv: kv[1]["_pubdate"]):
        names = [cats.get(c) for c in (r.get("categories") or [])]
        names = [n for n in names if n]
        title = clean_text((r.get("title") or {}).get("rendered"))

        if SKIP_CATEGORIES & set(names):
            skipped += 1
            skipped_list.append((r["_pubdate"][:10], slug, ",".join(names)))
            continue
        if EPISODE_TITLE.match(title):
            skipped += 1
            skipped_list.append((r["_pubdate"][:10], slug, "episode-title"))
            continue
        body = strip_cta((r.get("content") or {}).get("rendered") or "")
        body, used = rewrite_html(body, known)
        images_used |= used
        md = html_to_md(body)

        desc = clean_text((r.get("excerpt") or {}).get("rendered"))
        # WordPress excerpt teasers: "(Continue)", "… Read More", "[…]" etc.
        desc = re.sub(
            r"\s*[\[\(]?\s*(?:…|\.\.\.)?\s*"
            r"(?:Continue(?:\s+Reading)?|Read\s+More|More)\s*[\]\)]?\s*$",
            "", desc, flags=re.I,
        ).strip()
        desc = re.sub(r"[\s…]+$", "", desc).rstrip(",;:")
        if len(desc) > 300:
            desc = desc[:297].rsplit(" ", 1)[0] + "..."
        if not desc:
            desc = (re.sub(r"[#*_>`\[\]()]", "", md).strip().split("\n")[0])[:200]

        pub = r["_pubdate"][:10]
        mod = (r.get("modified") or "")[:10]
        tags = [n for n in names]

        fm = ["---", f"title: {yaml_str(title)}", f"description: {yaml_str(desc)}",
              f"pubDate: {pub}"]
        if mod and mod > pub and mod not in bulk_dates:
            fm.append(f"updatedDate: {mod}")
        fm.append("dateApproximate: false")
        fm.append(f"originalUrl: {yaml_str(f'{ORIGIN}/{slug}/')}")
        if tags:
            fm.append("tags:")
            fm += [f"  - {yaml_str(t)}" for t in tags]
        fm.append("draft: false")
        fm.append("---")

        with open(os.path.join(OUT, slug + ".md"), "w") as f:
            f.write("\n".join(fm) + "\n\n" + md + "\n")
        written += 1
        manifest.append({"slug": slug, "title": title, "pubDate": pub,
                         "tags": tags, "source": r["_src"], "chars": len(md)})

    json.dump({"written": written, "skipped": skipped,
               "images": sorted(images_used), "posts": manifest},
              open("out/manifest.json", "w"), indent=1)

    print(f"written: {written}   skipped (podcast/interview): {skipped}")
    print(f"distinct images referenced: {len(images_used)}")
    print("\nskipped sample:")
    for d, s, c in skipped_list[:5]:
        print(f"   {d}  {s[:52]:<52} [{c}]")


if __name__ == "__main__":
    main()
