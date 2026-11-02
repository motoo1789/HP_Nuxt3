import { createClient, type ContentfulClientApi } from "contentful";
import { getContentfulPublicConfig } from "~/utils/contentfulPublicConfig";

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();
  const params = getContentfulPublicConfig(runtimeConfig.public);

  let client: ContentfulClientApi<undefined> | null = null;

  if (!params) {
    if (import.meta.env.DEV) {
      console.warn(
        "[contentful] Contentful の Space ID / Access Token が読み込めていません。.env を保存したうえで dev サーバーを再起動し、NEXT_PUBLIC_* または NUXT_PUBLIC_* が空でないか確認してください。",
      );
    }
  } else {
    client = createClient(params);
  }

  return {
    provide: {
      client,
    },
  };
});
