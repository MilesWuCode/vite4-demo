import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
// 不使用,記錄用
// import Pages from 'vite-plugin-pages'
// import Layouts from 'vite-plugin-vue-layouts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // treat all tags with a dash as custom elements
          isCustomElement: (tag) => tag.includes('-'),

          // production remove test attribut: data-test="name"
          nodeTransforms: [
            (node) => {
              if (process.env.NODE_ENV === 'production') {
                if (node.type === 1 /*NodeTypes.ELEMENT*/) {
                  for (let i = 0; i < node.props.length; i++) {
                    const p = node.props[i]
                    if (p && p.type === 6 /*NodeTypes.ATTRIBUTE*/ && p.name === 'data-test') {
                      node.props.splice(i, 1)
                      i--
                    }
                  }
                }
              }
            }
          ]
        }
      }
    }),

    // 不使用,記錄用
    // https://github.com/hannoeru/vite-plugin-pages
    // Pages({
    //   extensions: ['vue'],
    //   dirs: 'src/views'
    // }),

    // 不使用,記錄用
    // https://github.com/johncampionjr/vite-plugin-vue-layouts
    // Layouts({
    //   layoutsDirs: 'src/layouts',
    //   defaultLayout: 'default'
    // }),

    visualizer()
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  build: {
    rollupOptions: {
      output: {
        // 自動柝檔命名
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        },

        // 自訂名字
        // manualChunks: {
        //   '@apollo+client': ['@apollo/client/cache', '@apollo/client/core'],
        //   'axios': ['axios'],
        //   '@headlessui+vue': ['@headlessui/vue'],
        // },

        // 官方範例
        // manualChunks(id) {
        //   if (id.includes('node_modules')) {
        //     return 'vendor'
        //   }
        // },

        // 分資料夾
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : []

          const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]'

          return `js/${fileName}/[name]-[hash].js`
        }
      }
    }
  }
})
