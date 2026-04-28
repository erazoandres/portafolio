import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: 'terser',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return null
          if (id.includes('react') || id.includes('react-dom')) return 'vendor-react'
          if (id.includes('gsap') || id.includes('@gsap')) return 'vendor-gsap'
          if (id.includes('lenis') || id.includes('split-type')) return 'vendor-utils'
          return null
        }
      }
    }
  }
})
