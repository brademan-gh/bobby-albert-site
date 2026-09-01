#!/usr/bin/env node
/**
 * Generates public/_redirects for Cloudflare Pages.
 *
 * WHY THIS EXISTS
 * ---------------
 * All 289 preserved posts were originally published at the root of the old
 * domain: `bobbyalbert.com/<slug>/`. This site serves them one level deeper,
 * at `/blog/<slug>/`. Without these redirects, pointing the domain at this
 * site would 404 every inbound link, bookmark and search result for Bobby's
 * writing — which is the exact thing the project exists to prevent.
 *
 * The mapping is not guessed: every post carries an `originalUrl` in its
 * frontmatter recording where it actually lived. This script reads that field
 * and emits one rule per post, so the file can never drift from the content.
 *
 * USAGE
 * -----
 *   node scripts/generate-redirects.mjs          # write public/_redirects
 *   node scripts/generate-redirects.mjs --check  # verify it's up to date (exit 1 if not)
 *
 * Re-run it after adding, removing or re-slugging a post, then commit the
 * result. `--check` is suitable for CI.
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BLOG_DIR = join(ROOT, 'src/content/blog');
const OUT = join(ROOT, 'public/_redirects');

// Cloudflare Pages limits: 2,000 static rules and 100 dynamic (splat/placeholder)
// rules, 2,100 total. Anything beyond the limit is silently ignored, so we fail
// loudly instead.
const MAX_STATIC = 2000;
const MAX_DYNAMIC = 100;

/**
 * Real paths this site serves. A redirect whose source matches one of these
 * would shadow actual content, so we refuse to emit it.
 */
const RESERVED = [
	'/',
	'/about/',
	'/blog/',
	'/resources/',
	'/review/',
	'/rss.xml',
	'/robots.txt',
	'/sitemap-index.xml',
	'/favicon.ico',
	'/favicon.svg',
];
const RESERVED_PREFIXES = ['/blog/', '/resources/', '/images/', '/pdfs/', '/_astro/'];

/** Minimal frontmatter reader — pulls single-line scalar fields only. */
function frontmatter(text) {
	const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	if (!m) return null;
	const out = {};
	for (const line of m[1].split(/\r?\n/)) {
		const kv = line.match(/^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/);
		if (!kv) continue;
		let v = kv[2].trim();
		if (v === '') continue;
		v = v.replace(/^["'](.*)["']$/, '$1');
		out[kv[1]] = v;
	}
	return out;
}

const problems = [];
const rules = [];
const seenSources = new Map();

const files = readdirSync(BLOG_DIR)
	.filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
	.sort();

for (const file of files) {
	const slug = basename(file).replace(/\.mdx?$/, '');
	const fm = frontmatter(readFileSync(join(BLOG_DIR, file), 'utf8'));

	if (!fm) {
		problems.push(`${file}: no frontmatter block found`);
		continue;
	}

	// Drafts are filtered out of every listing and route, so they are not
	// reachable and must not get a redirect pointing at a 404.
	if (String(fm.draft).toLowerCase() === 'true') continue;

	if (!fm.originalUrl) {
		problems.push(`${file}: no originalUrl — cannot derive its old path`);
		continue;
	}

	let from;
	try {
		from = new URL(fm.originalUrl).pathname;
	} catch {
		problems.push(`${file}: originalUrl is not a valid URL (${fm.originalUrl})`);
		continue;
	}

	if (!from.endsWith('/')) from += '/';
	const to = `/blog/${slug}/`;

	// A post whose old path already equals its new path needs no rule. This
	// becomes the norm if the site is ever restructured to serve posts at root.
	if (from === to) continue;

	if (RESERVED.includes(from) || RESERVED_PREFIXES.some((p) => from.startsWith(p))) {
		problems.push(`${file}: old path ${from} collides with a real site route — skipped`);
		continue;
	}

	if (seenSources.has(from)) {
		problems.push(`${file}: old path ${from} already claimed by ${seenSources.get(from)}`);
		continue;
	}
	seenSources.set(from, file);

	rules.push([from, to]);

	// Emit the slash-less variant too. WordPress served these URLs with a
	// trailing slash, but links shared by hand, pasted into emails or rewritten
	// by other sites frequently drop it — and Cloudflare does NOT normalise a
	// slash-less path that has no matching asset, so it would fall through to
	// the 404 page. Verified under `wrangler pages dev`.
	const bare = from.slice(0, -1);
	if (bare && !seenSources.has(bare)) {
		seenSources.set(bare, file);
		rules.push([bare, to]);
	}
}

/**
 * Wildcard rules. Ordered after the static ones — Cloudflare evaluates top to
 * bottom and stops at the first match, so specific rules must come first.
 *
 *  - Images on the old WordPress site lived at /wp-content/uploads/<y>/<m>/<file>
 *    and were imported to /images/<y>/<m>/<file>. This rescues hotlinked and
 *    indexed image URLs.
 *  - /category/* and /tag/* were WordPress archive pages that have no equivalent
 *    here; the blog index is the closest useful destination.
 *  - /feed/ was the WordPress RSS path.
 */
const dynamicRules = [
	['/wp-content/uploads/*', '/images/:splat', 301],
	['/category/*', '/blog/', 301],
	['/tag/*', '/blog/', 301],
	['/feed/', '/rss.xml', 301],
	['/feed/*', '/rss.xml', 301],
];

const staticCount = rules.length;
const dynamicCount = dynamicRules.length;

if (staticCount > MAX_STATIC) problems.push(`${staticCount} static rules exceeds Cloudflare's ${MAX_STATIC} limit`);
if (dynamicCount > MAX_DYNAMIC) problems.push(`${dynamicCount} dynamic rules exceeds Cloudflare's ${MAX_DYNAMIC} limit`);

if (problems.length) {
	console.error('Problems found:\n' + problems.map((p) => `  - ${p}`).join('\n'));
	if (problems.some((p) => p.includes('exceeds'))) process.exit(1);
}

// Column width must account for BOTH columns. Sizing it on the source paths
// alone leaves the longest destination touching its status code with no
// separator, which silently produces a malformed rule.
const allCells = [...rules.flat(), ...dynamicRules.flatMap(([f, t]) => [f, t])];
const width = Math.max(...allCells.map((c) => c.length), 24) + 2;
const body = [
	'# Generated by scripts/generate-redirects.mjs — do not edit by hand.',
	'#',
	'# Preserves inbound links to the 289 posts that were published at the root',
	'# of the old domain (bobbyalbert.com/<slug>/) and now live at /blog/<slug>/.',
	'# Re-run the script after adding or re-slugging a post.',
	'#',
	`# ${staticCount} static rules + ${dynamicCount} dynamic (limits: ${MAX_STATIC} / ${MAX_DYNAMIC}).`,
	'',
	...rules.map(([f, t]) => `${f.padEnd(width)}${t.padEnd(width)}301`),
	'',
	'# Old WordPress paths with no one-to-one equivalent.',
	...dynamicRules.map(([f, t, c]) => `${f.padEnd(width)}${t.padEnd(width)}${c}`),
	'',
].join('\n');

// Self-check: every non-comment line must parse as exactly three
// whitespace-separated fields. Cloudflare silently ignores malformed rules, so
// a formatting slip would fail open — no error, just no redirect.
for (const [i, line] of body.split('\n').entries()) {
	if (!line.trim() || line.startsWith('#')) continue;
	const fields = line.trim().split(/\s+/);
	if (fields.length !== 3 || !/^\d{3}$/.test(fields[2])) {
		console.error(`Malformed rule at line ${i + 1}: ${JSON.stringify(line)}`);
		process.exit(1);
	}
}

if (process.argv.includes('--check')) {
	const current = existsSync(OUT) ? readFileSync(OUT, 'utf8') : '';
	if (current !== body) {
		console.error('public/_redirects is out of date — run: node scripts/generate-redirects.mjs');
		process.exit(1);
	}
	console.log(`public/_redirects is up to date (${staticCount} static + ${dynamicCount} dynamic rules).`);
} else {
	writeFileSync(OUT, body);
	console.log(`Wrote public/_redirects — ${staticCount} static + ${dynamicCount} dynamic rules.`);
}
