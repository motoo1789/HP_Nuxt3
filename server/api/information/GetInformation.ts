import clientContentful  from "contentful";
import { CreateClientParams } from "contentful";

/**
 * CMSからinformationを持ってくる
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
    
    const informationCntents = await clientedClient.getEntries({
        content_type: process.env.NEXT_PUBLIC_CONTENTFUL_CONTENT_TYPE_INFORMATIONL,
        limit: CONTENS_LIMIT
    });

    return informationCntents;
} );

