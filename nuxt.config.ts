// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const rootDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({

  imports: {
    // domain 層 (composables/domain) は含めない — 同名 export の衝突を避ける
    dirs: [
      "composables",
      "composables/application/hobby",
      "composables/application/project",
    ],
  },

  runtimeConfig: {
    public: {
      // Vercel 本番と同じ NEXT_PUBLIC_* 名をそのまま使える（dev 起動時に .env から読み込み）
      contentfulSpaceId:
        process.env.NUXT_PUBLIC_CONTENTFUL_SPACE_ID ||
        process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ||
        "",
      contentfulEnviroment:
        process.env.NUXT_PUBLIC_CONTENTFUL_ENVIROMENT ||
        process.env.NEXT_PUBLIC_CONTENTFUL_ENVIROMENT ||
        "master",
      contentfulAccessToken:
        process.env.NUXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ||
        process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ||
        "",
      contentfulProject:
        process.env.NUXT_PUBLIC_CONTENTFUL_CONTENT_TYPE_PROJECT ||
        process.env.NEXT_PUBLIC_CONTENTFUL_CONTENT_TYPE_PROJECT ||
        "",
      contentfulInformationType:
        process.env.NUXT_PUBLIC_CONTENTFUL_CONTENT_TYPE_INFORMATIONL ||
        process.env.NEXT_PUBLIC_CONTENTFUL_CONTENT_TYPE_INFORMATIONL ||
        process.env.NUXT_PUBLIC_CONTENTFUL_CONTENT_TYPE_INFORMATION ||
        process.env.NEXT_PUBLIC_CONTENTFUL_CONTENT_TYPE_INFORMATION ||
        process.env.NUXT_PUBLIC_CONTENTFUL_CONTENT_TYPE_NEWINFORMATION ||
        process.env.NEXT_PUBLIC_CONTENTFUL_CONTENT_TYPE_NEWINFORMATION ||
        "",
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
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "~/assets/css/font.css";`,
        },
      },
    },
    resolve: {
      alias: {
        "next-auth/core": resolve(rootDir, "node_modules/next-auth/core/index.js"),
      },
    },
  },

  nitro: {
    alias: {
      "next-auth/core": resolve(rootDir, "node_modules/next-auth/core/index.js"),
    },
  },

  serverMiddleware: [
    { path: "api/anime", handler: "~/server/api/anime" },
    { path: "api/contentful", handler: "~/server/api/contentful" },
    { path: "api/hobby/anime", handler: "~/server/api/hobby/anime" },
    // { path: "api/contentful/migrationAnime", handler: "~/server/api/contentful/migrationAnime" }, // Entityを追加するようapi通常時は使わない
  ],

  modules: ["@nuxtjs/prismic", "@sidebase/nuxt-auth"],

  auth: {
    enableGlobalAppMiddleware: false, // trueの場合は最初にログインページを表示
    // 未設定時は本番 URL。ローカルは .env の NUXT_PUBLIC_AUTH_ORIGIN=http://localhost:3000
    origin:
      process.env.NUXT_PUBLIC_AUTH_ORIGIN ||
      "https://hp-nuxt3-motoo1789.vercel.app",
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
