import { createClient } from "contentful";

export default defineNuxtPlugin(() => {
  const configContentful = useRuntimeConfig();
  console.log(configContentful);

  return {
	provide: {
      client: createClient({
        space: configContentful.public.contentfulSpaceId,
        accessToken: configContentful.public.contentfulAccessToken,
      }),
    },
  };
});
