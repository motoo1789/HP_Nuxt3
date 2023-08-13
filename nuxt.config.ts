// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
})