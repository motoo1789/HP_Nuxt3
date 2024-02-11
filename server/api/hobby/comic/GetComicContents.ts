import clientContentful  from "contentful";
import { CreateClientParams } from "contentful";

/**
 * CMSからアニメコンテンツを持ってくる
 * 
 * @returns Object
 */
export default defineEventHandler(async (event) => {
    const CONTENT_MODEL = "comic"

    const CONTENS_LIMIT = 500;
    const clientParams: CreateClientParams = {
        space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
        accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
    };
    const clientedClient = await clientContentful.createClient(clientParams)
    const comicContents = await clientedClient.getEntries({
        content_type: CONTENT_MODEL,
        limit: CONTENS_LIMIT
    });
        
    return comicContents;
} );

