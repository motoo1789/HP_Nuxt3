import clientContentful  from "contentful";
import { CreateClientParams } from "contentful";

/**
 * CMSからプロジェクトコンテンツを持ってくる
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
    const projectCntents = await clientedClient.getEntries({
        content_type: process.env.NEXT_PUBLIC_CONTENTFUL_CONTENT_TYPE_PROJECT,
        limit: CONTENS_LIMIT
    });

    
    return projectCntents;
} );

