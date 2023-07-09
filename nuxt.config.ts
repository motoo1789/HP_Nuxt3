// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
      shim: false,
    },

  ssr: false,
  css: ["vuetify/styles", "@mdi/font/css/materialdesignicons.css"],

  build: {
    transpile: ["vuetify"],
  },

  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  
},

  serverMiddleware: [
    { path: 'api/anime', handler: "~/server/api/anime"},
    { path: 'api/contentful', handler: "~/server/api/contentful"},
    
  ],

  modules: ["@nuxtjs/prismic"],

  prismic: {
    endpoint: "hp-nuxt",
  },
})