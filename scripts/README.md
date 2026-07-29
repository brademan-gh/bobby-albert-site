# scripts/

## convert-wordpress-archive.py

Converts the archived WordPress REST API records for bobbyalbert.com /
valuesdrivenculture.com into Astro content-collection Markdown.

**Source data** (not in this repo — it lives in Brady's Dropbox):
`Bobby Albert/VDC Backup from Matt Simpson/`, a static crawl made by the
former site admin before both sites were taken down. The crawl captured
`wp-json/wp/v2/`, which is what this script reads.

### Usage
Run from a directory containing a `wp/` folder with the two archives laid out as:

```
wp/Bobby Albert/BA Website Archive/bobbyalbert.wpenginepowered.com/wp-json/wp/v2/{posts,categories}/*.json
wp/VDC/VDC Website Archive/valuesdrivenculture.com/wp-json/wp/v2/{posts,categories}/*.json
```

```
python3 convert-wordpress-archive.py     # writes out/blog/*.md + out/manifest.json
```

Requires `pandoc` and `python3`. Images are NOT copied by this script — it
records every referenced path in `manifest.json` under `"images"`; copy those
from `wp-content/uploads/` into `public/images/` preserving `<year>/<month>/`.

### What it decides, and why
- **BA archive is the body source**; VDC only supplies its 4 unique posts.
  VDC bodies contain ConvertKit opt-in blocks; BA bodies are clean.
- **`pubDate = min(BA.date, VDC.date)`** — VDC republished old posts with new
  dates (15 posts dated 2023 are really 2014–2021). Republishing moves a date
  forward, never backward, so the earlier date is the original.
- **`updatedDate` suppressed when 3+ posts share the same `modified` date** —
  WordPress `modified` is dominated by bulk migrations (54 posts share
  2017-07-19). Publishing those would falsely age 2014 writing.
- **Podcast exclusion is two-pronged.** Category (`Podcasts`, `Interviews`)
  catches 60 guest appearances. A title regex `^\d+:\s` catches 32 Lead2Grow
  episodes that carry only the `Leadership` category. Both are required.
  The regex keys on the *colon* so legitimate listicles ("10 Ways to…",
  "3 Questions Great Leaders Ask") are unaffected.
- **Slugs preserved verbatim**, including inconsistent ones
  (`communication_matters`, `dont_ignore_this_sales_trend`). Changing them
  breaks the inbound links this project exists to protect.
- **Pandoc's empty-comment list separator is stripped.** Pandoc emits
  ```` ```{=html} ```` + `<!-- -->` between adjacent lists; Astro renders that
  fence as a literal code block (1,047 black boxes across 154 posts on the
  first deploy). Removing it also lets split ordered lists renumber correctly.
- **4-space-indented paragraphs become blockquotes.** They are WordPress
  pull-quotes; Markdown would render them as code. Safe because this corpus
  contains zero real code. Guarded so list continuations are untouched.
- **Dead old-site links are unwrapped, anchor text kept.** 47 targets were
  lead magnets/downloads that no longer exist.

### Not yet handled
The 60 True North Leader / True North Business podcast episodes live in a
separate WordPress post type (`wp-json/wp/v2/podcast/`, slugs `tnl1`–`tnl30`,
`tnb1`–`tnb28`, Aug 2021 – Nov 2022). This script never reads that endpoint.
