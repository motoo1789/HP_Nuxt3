import * as contentful from "contentful-management";
import { Environment } from "contentful-management/dist/typings/entities/environment";

interface POSTFormat {
	title: string,
	abstract: string,
	detail: string,
	library: string
	language: string,
	framework: string,
	github: string,
	createdProjectDate: string,
	image: string,
	movie: string,
}

export default defineEventHandler(async (event) => {
    console.log("サーバー側処理：addUser")
    
    const postBody = await readMultipartFormData(event);
    console.log("readMultipartFormData");
    console.log(postBody);

    console.log();

    console.log("readData");
    console.log(await readBody(event) as POSTFormat) ;
    const post = await readBody(event) as POSTFormat;

    const image = post.image;
    const fetchimage = await fetch(image);
    console.log("fetchimage");
    // console.log(fetchimage);
    // console.log(fetchimage.body);

    //const blob = new Blob([fetchimage.respons], { type: "image/jpeg" });
    const fileData = image.replace(/^data:\w+\/\w+;base64,/, '')
    // console.log(fileData)
    const decodedFile = Buffer.from(fileData, 'base64')

    // ファイルの拡張子(png)
    const fileExtension = image.toString().slice(image.indexOf('/') + 1, image.indexOf(';'))

    // ContentType(image/png)
    const contentType = image.toString().slice(image.indexOf(':') + 1, image.indexOf(';'))

    const contentfullPostFile = new File([decodedFile], 'postimage.png', { type: 'image/png' })
    console.log("decodedFile" )
    console.log(typeof decodedFile )
    console.log(decodedFile )

    console.log("fileExtension" )
    console.log(typeof fileExtension )
    console.log(fileExtension )

    console.log("contentType" )
    console.log(typeof contentType )
    console.log(contentType )

    const sendContentful = {
        Body: decodedFile,
        Bucket: 'Bucket Name',
        Key: [post.title, fileExtension].join('.'),
        ContentType: 'application/octet-stream'
    }

    console.log(sendContentful)

    const spaceId = process.env.CONTENTFUL_SPACE_ID!;
    

    if (event.node.req.method === 'POST') {
        const { $client } = useNuxtApp();
        const spaceId = process.env.CONTENTFUL_SPACE_ID!;
        // const { data: cms } = await useAsyncData(spaceId, () => $client.getSpace(spaceId));
        const { data } = await useAsyncData(spaceId, () => $client.getSpace(spaceId));
        const environment = await useAsyncData('',() => data.getEnvironment(process.env.environment_id));
            
        $client.getSpace(spaceId)
        .then((space) => space.getEnvironment(process.env.CONTENTFUL_ENTRY_ID))
            .then((environment) => environment.createEntryWithId('hpNuxt', '0000000000000000000001', {
                fields: {
                    title: {
                        'en-US': post.title
                    },
                    abstract: {
                        'en-US': post.abstract
                    },
                    detail: {
                        'en-US': post.detail
                    },
                    library: {
                        'en-US': post.library
                    },
                    language: {
                        'en-US': post.language
                    },
	                framework: {
                        'en-US': post.framework
                    },
	                github: {
                        'en-US':  post.github
                    },
	                createdProjectDate: {
                        'en-US': post.createdProjectDate
                    },
	                image: {
                        "en-US": {
                            "contentType": contentType,
                            "fileName": [post.title, fileExtension].join('.'),
                            "Body": decodedFile,
                            "uploadFrom": {
                                "sys": {
                                  "type": "Link",
                                  "linkType": "Upload",
                                  "id": "<use sys.id of an upload resource response here>"
                                }
                            }
                        }
                    },
	                movie: {
                        'en-US': {
                            "contentType": "application/octet-stream",
                            "fileName": [post.title, fileExtension].join('.'),
                            "Body": decodedFile,
                            "uploadFrom": {
                                "sys": {
                                  "type": "Link",
                                  "linkType": "Upload",
                                  "id": "<use sys.id of an upload resource response here>"
                                }
                            }
                        }
                    }
                }
            }))
            .then((entry) => console.log(entry))
            .catch(console.error)

        console.log()
        return "success";
    }



})