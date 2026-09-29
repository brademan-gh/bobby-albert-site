// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://bobbyalbert.com',
	integrations: [
		mdx(),
		// /search is a tool, not content: it is empty without a query and every
		// ?q= is the same page. Keep it out of the sitemap; it also carries a
		// noindex tag of its own.
		sitemap({ filter: (page) => !page.includes('/search/') }),
	],
	// /topics/ has no index page of its own — /blog is the topic hub. Without this,
	// trimming a topic URL back to its parent, which people and crawlers both do,
	// lands on the 404.
	redirects: {
		'/topics': '/blog/',
	},
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/atkinson-regular.woff'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/atkinson-bold.woff'],
						weight: 700,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
