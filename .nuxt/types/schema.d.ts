import { NuxtModule } from 'nuxt/schema'
declare module 'nuxt/schema' {
  interface NuxtConfig {
    ["prismic"]?: typeof import("@nuxtjs/prismic").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["auth"]?: typeof import("@sidebase/nuxt-auth").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule | string | [NuxtModule | string, Record<string, any>] | ["@nuxtjs/prismic", Exclude<NuxtConfig["prismic"], boolean>] | ["@sidebase/nuxt-auth", Exclude<NuxtConfig["auth"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
  interface RuntimeConfig {
   app: {
      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },

   auth: {
      isEnabled: boolean,

      origin: string,

      basePath: string,

      trustHost: boolean,

      enableSessionRefreshPeriodically: boolean,

      enableSessionRefreshOnWindowFocus: boolean,

      enableGlobalAppMiddleware: boolean,

      defaultProvider: any,

      addDefaultCallbackUrl: boolean,

      globalMiddlewareOptions: {
         allow404WithoutAuth: boolean,

         addDefaultCallbackUrl: boolean,
      },

      isOriginSet: boolean,
   },
  }
  interface PublicRuntimeConfig {
   contentfulSpaceId: string,

   contentfulEnviroment: string,

   contentfulAccessToken: string,

   contentfulProject: string,

   contentfulInformationType: string,

   newt: {
      formEndpoint: string,
   },

   reCAPTCHA: {
      key: string,
   },

   prismic: {
      endpoint: string,

      clientConfig: any,

      client: string,

      linkResolver: string,

      richTextSerializer: string,

      injectComponents: boolean,

      components: any,

      preview: string,

      toolbar: boolean,
   },

   auth: {
      isEnabled: boolean,

      origin: string,

      basePath: string,

      trustHost: boolean,

      enableSessionRefreshPeriodically: boolean,

      enableSessionRefreshOnWindowFocus: boolean,

      enableGlobalAppMiddleware: boolean,

      defaultProvider: any,

      addDefaultCallbackUrl: boolean,

      globalMiddlewareOptions: {
         allow404WithoutAuth: boolean,

         addDefaultCallbackUrl: boolean,
      },
   },
  }
}