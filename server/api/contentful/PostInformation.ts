// pluginsは server/api で使用できないのでimportが必要
import contentful from "contentful-management";

interface POSTFormat {
    createdInformationDate: string,
	shortContent: string,
	abstract: string,
	detaile: string,
}

export default defineEventHandler(async (event) => {
    console.log("サーバー側処理：PostInformation")

    const post = await readBody(event) as POSTFormat;

    if (event.node.req.method === 'POST') 
    {
        const client = await contentful.createClient({
            accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_API_KEY!,
            host: "api.contentful.com" // ホストは共通なので.envに記載しない
        });

        const mySpace = await client.getSpace(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!);
        const myEnvironment = await mySpace.getEnvironment(process.env.NEXT_PUBLIC_CONTENTFUL_ENVIROMENT!);
        const assetRes = await myEnvironment.createEntry(process.env.NEXT_PUBLIC_CONTENTFUL_CONTENT_TYPE_ID!,{
            fields: {
                abstract: {
                    'en-US': post.abstract
                },
                detaile: {
                    'en-US': post.detaile
                },
                shortContent: {
                    'en-US': post.abstract
                },
                updateDate: {
                    'en-US': post.createdInformationDate
                },	            
            }
        });

        await assetRes.publish();

        console.log("投稿OK")
        return "success";
    }
})