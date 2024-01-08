import { createClient } from "contentful";
import { CreateClientParams } from 'contentful'
import { ContentfulClientApi } from "contentful"

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

  console.log(`env アクセストークン:${configContentful.public.contentfulAccessToken}`)
  console.log("env アクセストークン:CRWQWaVfuYO7GFoepi_x8EJlCPEKc8gRXx9-u9kE_ds")
  if(configContentful.public.contentfulAccessToken === 'CRWQWaVfuYO7GFoepi_x8EJlCPEKc8gRXx9-u9kE_ds')
{
  console.log("同じ1")
}
if(configContentful.public.contentfulSpaceId === 'gtch6w6darsf')
{
  console.log("同じ2")
}

  const test : CreateClientParams = {
    space : configContentful.public.contentfulSpaceId,
    accessToken : configContentful.public.contentfulAccessToken
  }

  const client = await createClient(test);
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
