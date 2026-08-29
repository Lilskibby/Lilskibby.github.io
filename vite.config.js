import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Stamped in at build time so the footer copyright year never goes
    // stale. A plain global (not import.meta.env.*) so Vite substitutes it
    // in both the client and SSR bundles.
    __BUILD_YEAR__: JSON.stringify(String(new Date().getFullYear())),
  },
  build: {
    target: 'es2019',
    cssMinify: true,
    assetsInlineLimit: 4096,
  },
})
