import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import autoprefixer from 'autoprefixer'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import pkg from './package.json'

const banner = `/**
  * ${pkg.name} v${pkg.version}
  * (c) 2024-${new Date().getFullYear()} ${pkg.author}
  * @license MIT
  */\n`

const bundlingConf = {
  minify: true,
  lib: {
    entry: resolve(__dirname, 'src/vue-cal/index.js'),
    name: 'vuecal', // The global name of the library.
    fileName: format => `vue-cal.${format}.js` // Output filename pattern.
  },
  rollupOptions: {
    // Make sure to externalize deps that shouldn't be bundled into library.
    external: id => {
      if (id === 'vue') return true // Externalize vue.
      if (id.endsWith('.json')) return true // Externalize JSON files.
      return false
    },
    output: {
      banner,
      globals: { vue: 'Vue' } // Vue should be treated as external and available as a global variable.
    }
  },
  copyPublicDir: false // Prevent copying `public/` to `dist` folder.
}

export default defineConfig({
  define: {
    'process.env': {
      ...process.env,
      VITE_APP_VERSION: process.env.npm_package_version,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
    }
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          whitespace: 'preserve'
        }
      }
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'src/vue-cal/i18n/*.json',
          dest: 'i18n' // Destination in the dist folder.
        }
      ]
    })
  ], // https://vitejs.dev/config/
  resolve: {
    alias: {
      '@': resolve(__dirname, '/src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: '@use "@/scss/variables" as *;'
      }
    },
    postcss: {
      plugins: [autoprefixer]
    }
  },
  build: process.env.BUNDLE ? bundlingConf : { outDir: 'docs' }
})
