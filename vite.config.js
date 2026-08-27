import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2019',
    cssMinify: true,
    assetsInlineLimit: 4096,
  },
})
