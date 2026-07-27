import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog posts — chronological content, served at /blog/[slug]/
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // Original publish date of the post (preserve Bobby's original dates,
    // not the date it was migrated into this archive).
    datePublished: z.coerce.date(),
    // Set true if this post's original publish date is unknown/approximate.
    dateApproximate: z.boolean().default(false),
    // Optional: link back to the original source URL this post was
    // preserved from, for provenance.
    originalUrl: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// PDF info sheets converted to HTML — evergreen/reference content,
// served at /resources/[slug]/. Kept as a separate collection from blog
// so it never gets mixed into the chronological blog feed.
const resources = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/resources' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // Filename of the source PDF, stored in public/pdfs/.
    // Convention: this MUST match the entry's slug exactly, e.g.
    // an entry at src/content/resources/leadership-guide.md pairs with
    // public/pdfs/leadership-guide.pdf and renders at /resources/leadership-guide/.
    sourcePdf: z.string(),
    category: z.string().optional(),
    dateConverted: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, resources };
