import { RuntimeConfig as UserRuntimeConfig } from 'nuxt/schema'
  interface SharedRuntimeConfig {
   appSecret: string,

   app: {
      buildId: string,

      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },
  }
  interface SharedPublicRuntimeConfig {
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

      environment: string,

      client: string,

      linkResolver: string,

      clientConfig: any,

      preview: string,

      toolbar: boolean,

      imports: Array<string>,

      components: {
         richTextComponents: string,
      },
   },

   auth: {
      isEnabled: boolean,

      baseURL: string,

      disableInternalRouting: boolean,

      disableServerSideAuth: boolean,

      originEnvKey: string,

      sessionRefresh: {
         enablePeriodically: boolean,

         enableOnWindowFocus: boolean,

         handler: any,
      },

      globalAppMiddleware: {
         isEnabled: boolean,

         allow404WithoutAuth: boolean,

         addDefaultCallbackUrl: boolean,
      },

      provider: {
         type: string,

         trustHost: boolean,

         defaultProvider: string,

         addDefaultCallbackUrl: boolean,
      },
   },
  }
declare module 'nuxt/schema' {
  interface RuntimeConfig extends SharedRuntimeConfig {}
  interface PublicRuntimeConfig extends SharedPublicRuntimeConfig {}
}
declare module '@nuxt/schema' {
  interface RuntimeConfig extends SharedRuntimeConfig {}
  interface PublicRuntimeConfig extends SharedPublicRuntimeConfig {}
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: UserRuntimeConfig
        }
      }