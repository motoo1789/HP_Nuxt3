import { createClient } from "contentful";

export default defineNuxtPlugin(async () => {

  const configContentful = await useRuntimeConfig();

  if(configContentful.public.contentfulSpaceId === undefined) {
    throw new Error("error");
    // return { provide : {client: createClient({space: "", accessToken: ""})}};
  }

  if(configContentful.public.contentfulAccessToken === undefined) {
    throw new Error("error");
    // return { provide : {client: createClient({space: "", accessToken: ""})}};
  }

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
