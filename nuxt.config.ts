// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  configureWebpack: {
    resolve: {
      mainFields: ['main', 'browser']
    }
  },
  typescript: {
      shim: false,
    },

  ssr: false,
  css: [
    "vuetify/styles", 
    "@mdi/font/css/materialdesignicons.css",
    '~/assets/css/font.css',
    '~/assets/css/card.css',
  ],

  build: {
    transpile: ["vuetify",'@vuepic/vue-datepicker'],

  },
  buildModules: [
    // Simple usage
    '@nuxtjs/vuetify',
  ],

  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  
},

  serverMiddleware: [
    { path: 'api/anime', handler: "~/server/api/anime"},
    { path: 'api/contentful', handler: "~/server/api/contentful"},
    
  ],

  modules: ["@nuxtjs/prismic", "@sidebase/nuxt-auth"],

  auth: {
    enableGlobalAppMiddleware: false, // trueの場合は最初にログインページを表示
    // origin: 'https://hp-nuxt3-motoo1789.vercel.app' localはいらない
  },

  redirect: {
    login: '/login',
    logout: '/',
    callback: false,
    home: '/'
  },

  prismic: {
    endpoint: "hp-nuxt",
  },
  proxy: {
    // ファイルのPOSTがうまくいかなかったら
    // options:[ 
    //     {
    //         target: process.env.API_HOST_URL,
    //         changeOrigin: true,
    //         pathRewrite: {
    //             "^/api/media/upload": "/api/v1/upload",
    //         },
    //         pathFilter: ["/api/media/upload"],
    //     },
    //     {
    //         target: process.env.API_HOST_URL,
    //         changeOrigin: true,
    //         pathRewrite: {
    //             "^/api/product/": "/api/v1/product",
    //         },
    //         pathFilter: ["/api/product"],
    //     },
    // ]
}, 
})