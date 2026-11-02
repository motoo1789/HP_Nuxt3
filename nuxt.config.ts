// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));
import os from "node:os";
import vuetify from "vite-plugin-vuetify";

// OneDrive 配下だと node_modules/.vite の削除で ENOTEMPTY が出やすい
const viteCacheDir = resolve(
  process.env.LOCALAPPDATA ?? os.tmpdir(),
  "HP_Nuxt3",
  "vite",
);

/**
 * サーバー専用 runtimeConfig.auth.origin（assertOrigin 用・非空必須）。
 * クライアントは hooks で public.auth.origin を空にし /api/auth を相対 URL にする。
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
    plugins: [vuetify({ autoImport: true })],
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
    alias: {
      // Nitro のデフォルト解決は CJS の .node.js になり named export が壊れる
      "contentful-management": resolve(
        projectRoot,
        "node_modules/contentful-management/dist/es-modules/contentful-management.js",
      ),
      // next-auth/jwt 用（Vercel: hkdf.default is not a function / MODULE_NOT_FOUND 対策）
      "@panva/hkdf": resolve(projectRoot, "server/shims/panva-hkdf.ts"),
      "@panva/hkdf-internal": resolve(
        projectRoot,
        "node_modules/@panva/hkdf/dist/node/cjs/index.js",
      ),
    },
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
        "node_modules/@panva/hkdf/**",
        "node_modules/jose/**",
      ],
    },
    commonJS: {
      include: [/next-auth/, /@babel\/runtime/, /@panva\/hkdf/],
    },
  },

  modules: [
    "@nuxtjs/prismic",
    "@sidebase/nuxt-auth",
    "~/modules/auth-public-origin",
    // 'nuxt-vitest'
  ],

  auth: {
    isEnabled: true,
    baseURL: `${resolveAuthOrigin()}/api/auth`,
    provider: {
      type: "authjs",
      trustHost: true,
    },
    globalAppMiddleware: {
      isEnabled: false,
    },
  },

  prismic: {
    endpoint: "hp-nuxt",
  },
});
