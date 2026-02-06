import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
// import px2rem from 'postcss-pxtorem'
import UnoCSS from 'unocss/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { configSvgIconsPlugin } from './vite/plugins/svgPlugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: [ 'vue', 'vue-router', 'pinia', '@vueuse/core', '@vueuse/head' ],
      resolvers: [
        VantResolver(),
        IconsResolver({
          prefix: 'Icon'
        })
      ],

      // eslint报错解决
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      }
    }),
    Components({
      resolvers: [VantResolver()],
    }),

    configSvgIconsPlugin(),
    Icons({
      autoInstall: true
    }),
    UnoCSS(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  server: {
    port: 3000,
    host: true,
    open: false,
 
  },
  

  // css: {
  //   postcss: {
  //     plugins: [
  //       px2rem({
  //         //rootValue: 37.5, // Vant 官方根字体大小是 37.5
  //         rootValue({ file }) {
  //            //如果设计稿的尺寸不是 375，而是 750 或其他大小，可以将 rootValue 配置调整为:
  //            //目的：当拿到width为750px的设计稿是其中的内容width是 多少就直接写多少即可，不用除以2了
  //           return file!.indexOf('vant') !== -1 ? 37.5 : 75
  //         },
  //         propList: ['*'], 
  //       })
  //     ]
  //   }
  // }
  
})


