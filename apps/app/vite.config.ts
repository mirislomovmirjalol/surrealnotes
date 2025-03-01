import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate' as const,
    workbox: {
      maximumFileSizeToCacheInBytes: 15 * 1024 * 1024, // 15MB
      globPatterns: ['**/*.{js,css,html,ico,png,svg,wasm}']
    },
    manifest: {
      name: 'Surreal Notes',
      short_name: 'SurrealNotes',
      description: 'A local-first note-taking app',
      theme_color: '#000000',
    }
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@workspace/ui': path.resolve(__dirname, '../../packages/ui/src'),
    },
  },
  optimizeDeps: {
    exclude: ['@surrealdb/wasm'],
    esbuildOptions: {
      target: 'esnext',
    },
  },
  build: {
    target: 'esnext',
  },
})
