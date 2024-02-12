import contentful from "contentful-management";
import { string } from "yup";

interface POSTFormat {
    syllabary : string,
    title : string
}

export default defineEventHandler(async (event) => {

    const post = await readBody(event) as POSTFormat;
    const syllabary = post.syllabary;
    const title = post.title;

    const client = await contentful.createClient({
        accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_API_KEY!,
        host: "api.contentful.com" // ホストは共通なので.envに記載しない
    });

    const mySpace = await client.getSpace(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!);
    const myEnvironment = await mySpace.getEnvironment(process.env.NEXT_PUBLIC_CONTENTFUL_ENVIROMENT!);
    const assetRes = await myEnvironment.createEntry( syllabary ,{
        fields: {
            title: {
                'en-US': title
            },
        }
    });

    await assetRes.publish();
    console.log("finished!!")
    
    return "success"
})
