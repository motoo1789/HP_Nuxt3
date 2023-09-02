import contentful from "contentful-management";
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
    
    // const postBody = await readMultipartFormData(event);
    // console.log("readMultipartFormData");
    // console.log(postBody);



    console.log("readData");
    //console.log(await readBody(event) as POSTFormat) ;
    const post = await readBody(event) as POSTFormat;

    const image = post.image;
    const movie = post.movie;
    const fetchimage = await fetch(image);
    const fetchmovie = await fetch(movie);
    console.log("fetchimage");
    // console.log(fetchimage);
    // console.log(fetchimage.body);

    //const blob = new Blob([fetchimage.respons], { type: "image/jpeg" });
    const imageFileData = image.replace(/^data:\w+\/\w+;base64,/, '')
    const movieFileData = movie.replace(/^data:\w+\/\w+;base64,/, '')
    // console.log(fileData)
    const decodedImageFile = Buffer.from(imageFileData, 'base64')
    const decodedMovieFile = Buffer.from(movieFileData, 'base64')

    // ファイルの拡張子(png)
    const imageFileExtension = image.toString().slice(image.indexOf('/') + 1, image.indexOf(';'))
    const movieFileExtension = movie.toString().slice(movie.indexOf('/') + 1, movie.indexOf(';'))


    // ContentType(image/png)
    const contentImageType = image.toString().slice(image.indexOf(':') + 1, image.indexOf(';'))
    const contentMovieType = movie.toString().slice(movie.indexOf(':') + 1, movie.indexOf(';'))


    const contentfullPostFile = new File([decodedImageFile], 'postimage.png', { type: 'image/png' })
    // console.log("decodedFile" )
    // console.log(typeof decodedFile )
    // console.log(decodedFile )

    // console.log("fileExtension" )
    // console.log(typeof fileExtension )
    // console.log(fileExtension )

    // console.log("contentType" )
    // console.log(typeof contentType )
    // console.log(contentType )

    const sendImageContentful = {
        Body: decodedImageFile,
        Bucket: 'Bucket Name',
        Key: [post.title, imageFileExtension].join('.'),
        ContentType: 'application/octet-stream'
    }
    const sendMovieContentful = {
        Body: decodedMovieFile,
        Bucket: 'Bucket Name',
        Key: [post.title, movieFileExtension].join('.'),
        ContentType: 'application/octet-stream'
    }
    

    //console.log(sendImageContentful)    

    if (event.node.req.method === 'POST') {
        const client = contentful.createClient({
            accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_API_KEY!,
            host: "api.contentful.com" // ホストは共通なので.envに記載しない
        });

        const mySpace = await client.getSpace(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!);
        const myEnvironment = await mySpace.getEnvironment(process.env.NEXT_PUBLIC_CONTENTFUL_ENVIROMENT!);
        const assetRes = await myEnvironment.createAsset({
            fields: {
                title: {
                'en-US': 'sample'
                },
                description: {
                'en-US': 'sample'
                },
                file: {
                'en-US': {
                    contentType: 'image/jpeg',
                    fileName: 'example.jpeg',
                    upload: decodedImageFile,
                }
                }
            }
        })

        // const mySpace = await client.getSpace(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!);
        // const myEnvironment = await mySpace.getEnvironment(process.env.NEXT_PUBLIC_CONTENTFUL_ENVIROMENT!);
        // const assetRes = await myEnvironment.createEntry(process.env.NEXT_PUBLIC_CONTENTFUL_CONTENT_TYPE_PROJECT!,{
        //     fields: {
        //         title: {
        //             'en-US': post.title
        //         },
        //         abstract: {
        //             'en-US': post.abstract
        //         },
        //         detail: {
        //             'en-US': post.detail
        //         },
        //         library: {
        //             'en-US': post.library
        //         },
        //         language: {
        //             'en-US': post.language
        //         },
        //         framework: {
        //             'en-US': post.framework
        //         },
        //         github: {
        //             'en-US':  post.github
        //         },
        //         createdDate: {
        //             'en-US': post.createdProjectDate
        //         },
        //         img: {
        //             "en-US": {
        //                 "contentType": "image/jpg",
        //                 "fileName": [post.title, imageFileExtension].join('.'),
        //                 "Body": sendImageContentful,
        //                 "uploadFrom": {
        //                     "sys": {
        //                       "type": "Link",
        //                       "linkType": "Upload",
        //                       "id": "<use sys.id of an upload resource response here>"
        //                     }
        //                 }
        //             }
        //         },
        //         movie: {
        //             'en-US': {
        //                 "contentType": "video/mp4",
        //                 "fileName": [post.title, movieFileExtension].join('.'),
        //                 "Body": sendMovieContentful,
        //                 "uploadFrom": {
        //                     "sys": {
        //                       "type": "Link",
        //                       "linkType": "Upload",
        //                       "id": "<use sys.id of an upload resource response here>"
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // });
            
        // assetRes.publish();
        // console.log("投稿OK")
        return "success";
    }



})