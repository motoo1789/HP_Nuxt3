import { createClient } from "contentful";

export default defineNuxtPlugin(() => {

  const configContentful = useRuntimeConfig();

  if( configContentful.public.contentfulSpaceId     === undefined ||
      configContentful.public.contentfulAccessToken === undefined) 
  {
    console.log("コンテンツを取得できていません");
    return {provide: {
      client: createClient({
        space: "",
        accessToken: ""
      })
    }}
  }

  return {
	  provide: {
      client: createClient({
        space: configContentful.public.contentfulSpaceId,
        accessToken: configContentful.public.contentfulAccessToken
      })
    }
  }
});
