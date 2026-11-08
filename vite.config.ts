import { copyFile } from 'node:fs/promises'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

/**
 * Emit a 404.html copy of the SPA shell. Static hosts such as GitHub Pages
 * serve it for deep links, where Vue Router then renders the right route.
 */
function spaFallbackPlugin(): Plugin {
  return {
    name: 'bcw-spa-fallback',
    apply: 'build',
    async closeBundle() {
      const distDir = fileURLToPath(new URL('./dist', import.meta.url))
      await copyFile(`${distDir}/index.html`, `${distDir}/404.html`)
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const rawBase = (env.VITE_BASE_PATH || '/').trim()
  const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`

  return {
    base,
    plugins: [vue(), spaFallbackPlugin()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      target: 'es2022',
      cssCodeSplit: true,
    },
  }
})
