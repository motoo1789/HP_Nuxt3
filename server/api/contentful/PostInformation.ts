import contentful from "contentful-management";
import { Environment } from "contentful-management/dist/typings/entities/environment";

interface POSTFormat {
    createdProjectDate: string,
	shortContent: string,
	abstract: string,
	detail: string,
}

export default defineEventHandler(async (event) => {
    console.log("サーバー側処理：PostInformation")

    console.log("readData");
    const post = await readBody(event) as POSTFormat;

    console.log(post)

    const spaceId = process.env.CONTENTFUL_SPACE_ID!;
    

    if (event.node.req.method === 'POST') {

        // const {$client} = useNuxtApp()
        // const spaceId = process.env.CONTENTFUL_SPACE_ID!;
        // const { data: cms } = await useAsyncData(spaceId, () => $client.getSpace(spaceId));
        // const { data } = await useAsyncData(spaceId, () => $client.getSpace(spaceId));
        // const environment = await useAsyncData('',() => data.getEnvironment(process.env.environment_id));
        console.log("connect")
        // const connect = async (): Promise<Environment> => {
        //     const client = contentful.createClient({
        //         space: process.env.CONTENTFUL_SPACE_ID!,
        //         accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
        //         host: "cdn.contentful.com"
        //     });
        //     const mySpace = await client.getSpace(process.env.CONTENTFUL_SPACE_ID!);
          
        //     return await mySpace.getEnvironment(process.env.CONTENTFUL_ENVIROMENT!);
        //   };
        // console.log(connect);
        // const myEnvironment = await connect();

        // const assetRes = await myEnvironment.createEntryWithId('NewInformation', post.abstract + post.createdProjectDate, {
        //     fields: {
        //         abstract: {
        //             'en-US': post.abstract
        //         },
        //         detail: {
        //             'en-US': post.detail
        //         },
        //         createdProjectDate: {
        //             'en-US': post.createdProjectDate
        //         },	 
        //         shortContent: {
        //             'en-US': post.abstract
        //         }               
        //     },
        // })

        // await assetRes.publish();

        console.log("createClient前")
        const client = contentful.createClient({
            
            accessToken: "CRWQWaVfuYO7GFoepi_x8EJlCPEKc8gRXx9-u9kE_ds",
            host: "cdn.contentful.com"
        });
        console.log(client)
        console.log("createClient後")

        
        const mySpace = await client.getSpace("gtch6w6darsf")
        console.log("getSpace後")
        console.log(mySpace)
        const myEnvironment = await mySpace.getEnvironment("master")
        console.log("getEnvironment後")
        const assetRes = await myEnvironment.createEntryWithId('NewInformation', post.abstract + post.createdProjectDate, {
            fields: {
                abstract: {
                    'en-US': post.abstract
                },
                detail: {
                    'en-US': post.detail
                },
                createdProjectDate: {
                    'en-US': post.createdProjectDate
                },	 
                shortContent: {
                    'en-US': post.abstract
                }               
            }
        })
        console.log("createEntryWithId後")

        await assetRes.publish();
        console.log("publish後")
        

        // console.log("post mae")
        // $client.getSpace(spaceId)
        // .then((space) => space.getEnvironment(process.env.CONTENTFUL_ENTRY_ID))
        //     .then((environment) => environment.createEntryWithId('NewInformation', post.abstract + post.createdProjectDate, {
                
        //         fields: {
        //             abstract: {
        //                 'en-US': post.abstract
        //             },
        //             detail: {
        //                 'en-US': post.detail
        //             },
	    //             createdProjectDate: {
        //                 'en-US': post.createdProjectDate
        //             },	 
        //             shortContent: {
        //                 'en-US': post.abstract
        //             }               
        //         }
        //     }))
        //     .then((entry) => console.log(entry))
        //     .catch(console.error)

        console.log("投稿OK")
        return "success";
    }



})