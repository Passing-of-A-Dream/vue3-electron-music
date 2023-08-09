import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteElectronDev } from './plugins/vite.electron.dev.js'
import { viteElectronBuild } from './plugins/vite.electron.build.js'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteElectronDev(),
    viteElectronBuild(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: [
        'vue',
      ],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  base: './', // 默认绝对路径修改为相对路径，否则打包后的文件会出现白屏
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
