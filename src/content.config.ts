import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Blog posts — chronological content, served at /blog/[slug]/
const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			// Added for the Bobby Albert preservation project:
			// set true if pubDate is estimated/unknown rather than exact.
			dateApproximate: z.boolean().default(false),
			// Optional link back to the original source URL this post was
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
	loader: glob({ base: './src/content/resources', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		// Filename of the source PDF (without extension), stored in
		// public/pdfs/. Convention: this MUST match the entry's slug
		// exactly, e.g. an entry at src/content/resources/leadership-guide.md
		// pairs with public/pdfs/leadership-guide.pdf and renders at
		// /resources/leadership-guide/.
		sourcePdf: z.string(),
		category: z.string().optional(),
		dateConverted: z.coerce.date(),
		draft: z.boolean().default(false),
	}),
});

export const collections = { blog, resources };
