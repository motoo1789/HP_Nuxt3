import { createClient } from "contentful";

export default defineNuxtPlugin(() => {
  const configContentful = useRuntimeConfig();

  return {
	provide: {
      client: createClient({
        space: configContentful.contentfulSpaceId,
        accessToken: configContentful.contentfulAccessToken,
      }),
    },
  };
});
