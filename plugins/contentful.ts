import { createClient } from "contentful";
import { getContentfulPublicConfig } from "~/utils/contentfulPublicConfig";

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();
  const params = getContentfulPublicConfig(runtimeConfig.public);

  if (!params) {
    if (import.meta.dev) {
      console.warn(
        "[contentful] Contentful の Space ID / Access Token が読み込めていません。.env を保存したうえで dev サーバーを再起動し、NEXT_PUBLIC_* または NUXT_PUBLIC_* が空でないか確認してください。",
      );
    }
    return {
      provide: {
        client: null,
      },
    };
  }

  const client = createClient(params);

  return {
    provide: {
      client,
    },
  };
});
