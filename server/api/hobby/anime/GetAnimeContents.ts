import contentful from "contentful-management";
import createClient  from "contentful";
import { CreateClientParams } from "contentful";

const Syllabary = {
    A : "animeA",
    Ka : "animeKa"
} as const

/**
 * CMSからアニメコンテンツを持ってくる
 * @params contentTtype string 
 * 
 * @returns Array<Object>
 */
export default defineEventHandler(async (event) => {
    // const {$client} = useNuxtApp()
    const client = await contentful.createClient({
        accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_API_KEY!,
        host: "api.contentful.com" // ホストは共通なので.envに記載しない
    });
    const test: CreateClientParams = {
        space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
        accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
      };
    const tmp = await createClient.createClient(test)
    const content = await tmp.getEntries( { content_type: Syllabary.A });

    // const mySpace = await client.getSpace(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!);
    // const myEnvironment = await mySpace.getEnvironment(process.env.NEXT_PUBLIC_CONTENTFUL_ENVIROMENT!);
    // const { data:getContents } = await myEnvironment.getEntries({
    //     content_type: Syllabary.A
    // });
    console.log("content");
    console.log(content);
    return content
    //return {a: "ア行のアニメ", i:"異形のアニメ"}
});

