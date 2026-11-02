// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
import { resolve } from "node:path";
import os from "node:os";

// OneDrive 配下だと node_modules/.vite の削除で ENOTEMPTY が出やすい
const viteCacheDir = resolve(
  process.env.LOCALAPPDATA ?? os.tmpdir(),
  "HP_Nuxt3",
  "vite",
);

/**
 * サーバー起動時 assertOrigin 用（空だと AUTH_NO_ORIGIN）。
 * ブラウザの session URL は plugins/auth-origin.client.ts が window.location.origin で上書き。
 * Vercel では VERCEL_* のみ（Dashboard の誤 NUXT_PUBLIC_AUTH_ORIGIN は使わない）。
 */
function resolveAuthOrigin(): string {
  if (process.env.VERCEL) {
    if (
      process.env.VERCEL_ENV === "production" &&
      process.env.VERCEL_PROJECT_PRODUCTION_URL
    ) {
      return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    }
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
    return "https://hp-nuxt3.vercel.app";
  }
  const fromEnv = process.env.NUXT_PUBLIC_AUTH_ORIGIN?.replace(/\/$/, "");
  if (fromEnv) {
    return fromEnv;
  }
  return "http://localhost:3000";
}

export default defineNuxtConfig({

  devServer: {
    port: 3000,
  },

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
      newt: {
        formEndpoint:
          process.env.NUXT_PUBLIC_NEWT ||
          process.env.NEXT_PUBLIC_NEWT ||
          process.env.Newt ||
          "",
      },
      reCAPTCHA: {
        key:
          process.env.NUXT_PUBLIC_RECAPTCHA ||
          process.env.NEXT_PUBLIC_RECAPTCHA ||
          process.env.NEXT_PUBLIC_SITE_KEY ||
          "",
      },
    },
  },

  typescript: {
    shim: false,
    strict: true,
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

  vite: {
    cacheDir: viteCacheDir,
    server: {
      strictPort: true,
    },
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
  },

  nitro: {
    // Vercel: external にすると node_modules に載らず ERR_MODULE_NOT_FOUND
    // inline で next-auth + @babel/runtime を関数に同梱（interop も runtime ごと）
    externals: {
      inline: [
        "next-auth",
        "next-auth/core",
        "next-auth/jwt",
        "next-auth/providers/github",
        "next-auth/providers/credentials",
        "@babel/runtime",
        "@babel/runtime/helpers/interopRequireDefault",
        "@babel/runtime/helpers/interopRequireWildcard",
      ],
      traceInclude: [
        "node_modules/next-auth/**",
        "node_modules/@babel/runtime/**",
      ],
    },
    commonJS: {
      include: [/next-auth/, /@babel\/runtime/],
    },
  },

  modules: [
    "@nuxtjs/prismic",
    "@sidebase/nuxt-auth",
    // 'nuxt-vitest'
  ],


  auth: {
    enableGlobalAppMiddleware: false, // trueの場合は最初にログインページを表示
    trustHost: true,
    origin: resolveAuthOrigin(),
  },

  prismic: {
    endpoint: "hp-nuxt",
  },
});
