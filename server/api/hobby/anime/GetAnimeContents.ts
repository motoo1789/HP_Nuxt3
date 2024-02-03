import clientContentful  from "contentful";
import { CreateClientParams } from "contentful";

const SyllabaryArray = [
    "animeA",
    "animeKa"
 ] as const

/**
 * CMSからアニメコンテンツを持ってくる
 * 
 * @returns Object
 */
export default defineEventHandler(async (event) => {
    const CONTENS_LIMIT = 500;
    const clientParams: CreateClientParams = {
        space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
        accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
    };
    const clientedClient = await clientContentful.createClient(clientParams)

    const contents = await Promise.all(SyllabaryArray.map( async (syllabary) => {
        const syllabaryContent = await clientedClient.getEntries({
             content_type: syllabary,
             limit: CONTENS_LIMIT
        });
        return syllabaryContent;
    }))

    console.log("content");
    console.log(contents);
    return contents
} );

