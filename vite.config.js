import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import Delete from 'rollup-plugin-delete'

// @todo: rm -rf ./dist/vuecal.common.i18n ./dist/vuecal.umd.i18n ./dist/vuecal.common.drag-and-drop.js ./dist/vuecal.umd.drag-and-drop.js && mv ./dist/vuecal.umd.min.i18n ./dist/i18n && mv ./dist/vuecal.umd.min.drag-and-drop.js ./dist/drag-and-drop.js && rm ./dist/demo.html

const bundlingConf = {
  lib: {
    entry: resolve(__dirname, '/src/vue-cal/index.js'),
    name: 'vue-cal',
    formats: ['es', 'umd', 'cjs']
  },
  rollupOptions: {
    plugins: [
      // Rollup generates all the files, then remove what we don't want.
      // @todo: find a better way.
      Delete({ targets: ['dist/{images,.htaccess}', 'dist/*.{ico,txt,html}'], hook: 'generateBundle' })
    ],
    // Make sure to externalize deps that shouldn't be bundled into library.
    external: ['vue'],
    output: {
      // Provide global variables to use in the UMD build for externalized deps.
      globals: { vue: 'Vue' }
    }
  }
}

const build = process.env.BUNDLE ? bundlingConf : { outDir: 'docs' }

export default defineConfig({
  define: {
    'process.env': {
      ...process.env,
      VITE_APP_VERSION: process.env.npm_package_version
    }
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          whitespace: 'preserve'
        }
      }
    })
  ], // https://vitejs.dev/config/
  resolve: {
    alias: {
      '@': resolve(__dirname, '/src')
    }
  },
  build
})
