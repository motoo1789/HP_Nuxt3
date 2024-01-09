import { createClient } from "contentful";
import { CreateClientParams } from "contentful";

export default defineNuxtPlugin(async () => {
  const configContentful = await useRuntimeConfig();

  if (	configContentful.public.contentfulSpaceId 		=== undefined ||
    		configContentful.public.contentfulAccessToken === undefined) {
    return {
      provide: {
        client: createClient({
          space: "",
          accessToken: "",
        }),
      },
    };
  }

  const test: CreateClientParams = {
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  };

  const client = await createClient(test);

  return {
    provide: {
      client: client,
    },
  };
});
