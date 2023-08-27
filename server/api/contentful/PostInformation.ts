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
    console.log("postの中身")

    if (event.node.req.method === 'POST') 
    {
        const client = contentful.createClient({
            accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_API_KEY!,
            host: "api.contentful.com" // ホストは共通なので.envに記載しない
        });
        console.log("client生成")

        const mySpace = await client.getSpace(process.env.CONTENTFUL_SPACE_ID!);
        console.log("getSpace生成")
        const myEnvironment = await mySpace.getEnvironment(process.env.CONTENTFUL_ENVIROMENT!);
        console.log("getEnvironment生成")
        const assetRes = await myEnvironment.createEntry(process.env.CONTENTFUL_CONTENT_TYPE_ID!,{
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

        assetRes.publish();

        console.log("投稿OK")
        return "success";
    }
})