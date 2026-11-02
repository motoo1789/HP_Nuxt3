import type { ContentfulClientApi } from "contentful";

declare module "#app" {
  interface NuxtApp {
    $client: ContentfulClientApi<undefined> | null;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $client: ContentfulClientApi<undefined> | null;
  }
}

export {};
