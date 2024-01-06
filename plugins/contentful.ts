import { createClient } from "contentful";

export default defineNuxtPlugin(async () => {

  const configContentful = await useRuntimeConfig();
  const client = await createClient({
    space: configContentful.public.contentfulSpaceId,
    accessToken: configContentful.public.contentfulAccessToken
  });
  console.log(client);

  // if( configContentful.public.contentfulSpaceId     === undefined ||
  //     configContentful.public.contentfulAccessToken === undefined) 
  // {
  //   console.log("コンテンツを取得できていません");
  //   return {provide: {
  //     client: createClient({
  //       space: "",
  //       accessToken: ""
  //     })
  //   }}
  // }

  return {
    provide: {
      client: client
    }
  }
});
