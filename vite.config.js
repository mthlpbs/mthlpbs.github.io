import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync } from 'fs'
import { resolve } from 'path'

// Custom plugin to ensure .config file is copied
const copyConfigPlugin = () => {
  return {
    name: 'copy-config',
    writeBundle() {
      const configSrc = resolve('public/.config')
      const configDest = resolve('dist/.config')
      if (existsSync(configSrc)) {
        copyFileSync(configSrc, configDest)
        console.log('✅ Copied .config file to dist/')
      }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), copyConfigPlugin()],
  base: './', // Use relative paths for GitHub Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    copyPublicDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          animation: ['framer-motion']
        }
      }
    }
  },
  server: {
    open: true,
    port: 3000
  }
})
