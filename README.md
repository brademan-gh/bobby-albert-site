# Bobby Albert — Site

A preservation site for Bobby Albert's blog posts and PDF information
sheets, built so his content stays findable and accessible — to people,
search engines, and AI crawlers/assistants alike.

Built with [Astro](https://astro.build), deployed on
[Cloudflare Pages](https://pages.cloudflare.com).

## Structure

```
src/
  content/
    blog/        Blog posts (Markdown). Renders to /blog/[slug]/
    resources/   PDF info sheets converted to HTML (Markdown). Renders to /resources/[slug]/
  content.config.ts   Frontmatter schemas for both collections
  layouts/
  pages/
public/
  pdfs/          Original PDF files, downloadable alongside their /resources/ page
  robots.txt
```

### Adding a blog post

Create `src/content/blog/your-slug.md` with frontmatter:

```yaml
---
title: "Post Title"
description: "One-sentence summary."
datePublished: 2021-06-01
dateApproximate: false   # true if the original date is unknown/estimated
originalUrl: "https://..." # optional, if migrating from a known source URL
tags: ["topic"]
draft: false
---
```

### Adding a resource (PDF info sheet)

1. Convert the PDF's content to Markdown/HTML and save it as
   `src/content/resources/your-slug.md`.
2. Place the original PDF file at `public/pdfs/your-slug.pdf` — **the
   filename must exactly match the content entry's slug.**
3. Set frontmatter:

```yaml
---
title: "Sheet Title"
description: "One-sentence summary."
sourcePdf: "your-slug"   # must match filename above (without .pdf)
category: "Topic"
dateConverted: 2026-07-27
draft: false
---
```

Each resource page links to its original PDF for download — the HTML page
makes the content findable and indexable; the PDF remains the primary way
readers consume it.

## Development

```
npm install
npm run dev
```

## Deployment

Deployed via Cloudflare Pages, connected directly to this GitHub repository.
Build command: `npm run build`. Output directory: `dist`.

Before going live, update the `site` URL in `astro.config.mjs` to the final
production domain — this affects the sitemap and canonical URLs, which
matter for search/AI discoverability.

## License

Site code is available under the [MIT License](./LICENSE).

All blog posts and PDF materials are © Bobby Albert. All rights reserved.
No content-reuse license is granted — the content is made publicly
findable and readable, but redistribution/reuse rights are not granted
beyond that.
