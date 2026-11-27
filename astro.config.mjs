import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://mansour-technologies.github.io',
  base: '/saad-khaled-website-concept',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
});
