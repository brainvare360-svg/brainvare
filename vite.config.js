import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Target modern browsers for smaller output
    target: 'es2020',
    // Enable CSS code splitting (per-page CSS chunks)
    cssCodeSplit: true,
    // Skip compressed size reporting to speed up builds
    reportCompressedSize: false,
    // Manual chunk splitting for optimal caching
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-lenis': ['lenis'],
        },
      },
    },
  },
})
