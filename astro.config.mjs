// Configuration du site officiel du CMPJ Regional du Littoral.
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Le domaine definitif (.cm) est a confirmer par la direction du Centre.
// En attendant, SITE sert de valeur de reference pour les URL canoniques et les metadonnees.
const SITE = process.env.PUBLIC_SITE_URL || 'https://cmpj-littoral.cm';

export default defineConfig({
  site: SITE,
  output: 'static',
  adapter: cloudflare({
    imageService: 'passthrough',
  }),
  integrations: [sitemap()],
  security: {
    checkOrigin: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
