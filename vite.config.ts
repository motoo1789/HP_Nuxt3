import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${resolve(__dirname, 'assets/css/font.css')}";`
      }
    }
  },
  build: {
    target: 'esnext', // ビルドのターゲットを指定
    // その他のビルド設定...
  }
})