// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  imports: {
    dirs: [
      'composables/**'
    ]
  },

  runtimeConfig: {
    public: {
      contentfulSpaceId: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
      contentfulEnviroment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIROMENT,
      contentfulAccessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
      contentfulProject : process.env.NEXT_PUBLIC_CONTENTFUL_CONTENT_TYPE_PROJECT,
      contentfulInformation : process.env.NEXT_PUBLIC_CONTENTFUL_CONTENT_TYPE_INFORMATIONL,
      newt: {
        formEndpoint:  process.env.NEXT_PUBLIC_NEWT
      },
      reCAPTCHA: {
        key: process.env.NEXT_PUBLIC_RECAPTCHA
      }
    },
  },

  configureWebpack: {
    resolve: {
      mainFields: ["main", "browser"],
    },
  },
  typescript: {
    shim: false,
  },

  ssr: false,
  css: [
    "vuetify/styles",
    "@mdi/font/css/materialdesignicons.css",
    "~/assets/css/font.css",
    "~/assets/css/card.css",
  ],

  build: {
    transpile: ["vuetify", "@vuepic/vue-datepicker"],
  },
  buildModules: [
    // Simple usage
    "@nuxtjs/vuetify",
  ],

  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },

  serverMiddleware: [
    { path: "api/anime", handler: "~/server/api/anime" },
    { path: "api/contentful", handler: "~/server/api/contentful" },
    { path: "api/hobby/anime", handler: "~/server/api/hobby/anime" },
    // { path: "api/contentful/migrationAnime", handler: "~/server/api/contentful/migrationAnime" }, // Entityを追加するようapi通常時は使わない
  ],

  modules: [
    "@nuxtjs/prismic",
    "@sidebase/nuxt-auth",
    // 'nuxt-vitest'
  ],


  auth: {
    enableGlobalAppMiddleware: false, // trueの場合は最初にログインページを表示
    isEnabled: true,
    baseURL: "https://hp-nuxt3.vercel.app/",
    provider: {
      type: 'authjs'
    },
    // origin: 'https://motoo1789.net/' // vercelのデプロイに必要
    // origin: 'https://motoo-lab.com/' // ec2用origin
  },

  redirect: {
    login: "/login",
    logout: "/",
    callback: false,
    home: "/",
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
});
