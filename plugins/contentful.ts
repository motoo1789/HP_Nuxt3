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
    space: configContentful.public.contentfulSpaceId,
    accessToken: configContentful.public.contentfulAccessToken,
  };

  const client = await createClient(test);

  return {
    provide: {
      client: client,
    },
  };
});
