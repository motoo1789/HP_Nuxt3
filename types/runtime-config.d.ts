declare module "nuxt/schema" {
  interface PublicRuntimeConfig {
    contentfulSpaceId: string;
    contentfulEnviroment: string;
    contentfulAccessToken: string;
    contentfulProject: string;
    contentfulInformationType: string;
  }
}

export {};
