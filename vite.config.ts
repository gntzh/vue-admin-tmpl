import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import Icons from 'unplugin-icons/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Icons({ compiler: 'vue3', autoInstall: true })],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
