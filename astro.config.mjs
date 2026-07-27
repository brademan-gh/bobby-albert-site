import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Replace with the final production URL once the custom domain is attached
// (e.g. https://bobbyalbert.com). This is required for correct sitemap /
// canonical URL generation, which matters for search & AI crawler discovery.
const SITE_URL = 'https://bobby-albert-site.pages.dev';

export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap()],
});
