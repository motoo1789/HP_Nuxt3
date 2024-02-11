import contentful from "contentful-management";

const anime  = [
    /**
     * Entityが全て消えるようなことがまた起これば
     * またここにアニメのタイトルを入れてpublishする
    */
   ""
]

export default defineEventHandler(async (event) => {

    const client = await contentful.createClient({
        accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_API_KEY!,
        host: "api.contentful.com" // ホストは共通なので.envに記載しない
    });

    const mySpace = await client.getSpace(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!);
    const myEnvironment = await mySpace.getEnvironment(process.env.NEXT_PUBLIC_CONTENTFUL_ENVIROMENT!);
    
    await anime.forEach(async element => {
        const assetRes = await myEnvironment.createEntry("/* ここにContent typeを指定 */",{
            fields: {
                title: {
                    'en-US': element
                },
            }
        });
    
        await assetRes.publish();
    
        console.log(element) // publishしたタイトルの確認用
    });
    console.log("finished!!")
    
    return "success"
})
