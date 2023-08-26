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
        const { $client } = useNuxtApp();
        const spaceId = process.env.CONTENTFUL_SPACE_ID!;
        const { data: cms } = await useAsyncData(spaceId, () => $client.getSpace(spaceId));
        const { data } = await useAsyncData(spaceId, () => $client.getSpace(spaceId));
        const environment = await useAsyncData('',() => data.getEnvironment(process.env.environment_id));
            
        $client.getSpace(spaceId)
        .then((space) => space.getEnvironment(process.env.CONTENTFUL_ENTRY_ID))
            .then((environment) => environment.createEntryWithId('hpNuxt', '0000000000000000000001', {
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
            }))
            .then((entry) => console.log(entry))
            .catch(console.error)

        console.log("getspace")
        return "success";
    }



})