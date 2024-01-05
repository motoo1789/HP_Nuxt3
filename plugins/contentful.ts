import { createClient } from "contentful";

export default defineNuxtPlugin(() => {
  const configContentful = useRuntimeConfig();
  console.log(configContentful);

  console.log("テスト");
  console.log("configContentful.public.contentfulAccessToken");
  console.log(configContentful.public.contentfulAccessToken);
  console.log("configContentful.public.contentfulSpaceId");
  console.log(configContentful.public.contentfulSpaceId);


  return {
	provide: {
      client: createClient({
        space: configContentful.public.contentfulSpaceId,
        accessToken: configContentful.public.contentfulAccessToken,
      }),
    },
  };
});
