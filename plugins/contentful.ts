import { createClient } from "contentful";

interface Contentful {
  contentfulSpaceId? : string;
  contentfulAccessToken? : string;
}

export default defineNuxtPlugin(() => {

  const configContentful = useRuntimeConfig();
  console.log(configContentful);

  const contentful : Contentful = {
    contentfulSpaceId: configContentful.public.contentfulSpaceId,
    contentfulAccessToken: configContentful.public.contentfulAccessToken
  }

  console.log("テスト");
  console.log("configContentful.public.contentfulAccessToken");
  console.log(configContentful.public.contentfulAccessToken);
  console.log("configContentful.public.contentfulSpaceId");
  console.log(configContentful.public.contentfulSpaceId);

  if( configContentful.public.contentfulSpaceId     === undefined ||
      configContentful.public.contentfulAccessToken === undefined) 
  {
    console.log("undefindらしい");
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
