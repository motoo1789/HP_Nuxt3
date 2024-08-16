import path from 'path'
import { defineVitestConfig } from '@nuxt/test-utils/config'


export default defineVitestConfig({
  plugins: [

  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
    },
  },
  test: {
    globals: true,
    environment: "nuxt",
    server: {
      deps: {
        inline: ['vuetify'],
      },
    },
    setupFiles: path.resolve(__dirname, './tests/setup.ts'),
  },
});
