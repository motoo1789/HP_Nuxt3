import { createClient } from "contentful";

export default defineNuxtPlugin(() => {

  const configContentful = useRuntimeConfig();
  const client = createClient({
    space: configContentful.public.contentfulSpaceId,
    accessToken: configContentful.public.contentfulAccessToken
  });
  console.log(client);

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

  if(undefined !== client)
  {
    return {
      provide: {
        client: client
      }
    }
  }
});
