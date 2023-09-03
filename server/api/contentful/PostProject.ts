import contentful from "contentful-management";
import { Environment } from "contentful-management/dist/typings/entities/environment";
import path from "path";
import fs from "fs";

interface POSTFormat {
    title: string;
    abstract: string;
    detail: string;
    library: string;
    language: string;
    framework: string;
    github: string;
    createdProjectDate: string;
    image: string;
    movie: string;
}

export default defineEventHandler(async (event) => {
    console.log("サーバー側処理：addUser");

    const post = (await readBody(event)) as POSTFormat;

    const image = post.image;
    const movie = post.movie;


    const imageFileData = image.replace(/^data:\w+\/\w+;base64,/, "");
    const movieFileData = movie.replace(/^data:\w+\/\w+;base64,/, "");
    // console.log(fileData)
    const decodedImageFile = Buffer.from(imageFileData, "base64");
    const decodedMovieFile = Buffer.from(movieFileData, "base64");

    // ファイルの拡張子(png)
    const imageFileExtension = image
        .toString()
        .slice(image.indexOf("/") + 1, image.indexOf(";"));
    const movieFileExtension = movie
        .toString()
        .slice(movie.indexOf("/") + 1, movie.indexOf(";"));

    // ContentType(image/png)
    const contentImageType = image
        .toString()
        .slice(image.indexOf(":") + 1, image.indexOf(";"));
    const contentMovieType = movie
        .toString()
        .slice(movie.indexOf(":") + 1, movie.indexOf(";"));


    const tmpfileimagename = [post.title, imageFileExtension].join(".");
    const tmpfilemoviname = [post.title, movieFileExtension].join(".");
 
    if (event.node.req.method === "POST") 
    {
        await fs.writeFileSync(`./public/image/${tmpfileimagename}`, imageFileData, {
            encoding: "base64",
        });
        await fs.writeFileSync(`./public/movie/${tmpfilemoviname}`, movieFileData, {
            encoding: "base64",
        });
        const tmpImageFilePath = await path.resolve("./public/image", tmpfileimagename);
        const tmpImageFile = await fs.readFileSync(tmpImageFilePath);

        const tmpMovieFilePath = await path.resolve("./public/movie", tmpfilemoviname);
        const tmpMovieFile = await fs.readFileSync(tmpMovieFilePath);

        
        const client = contentful.createClient({
            accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_API_KEY!,
            host: "api.contentful.com", // ホストは共通なので.envに記載しない
        });
        const mySpace = await client.getSpace(
            process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!
        );
        const myEnvironment = await mySpace.getEnvironment(
            process.env.NEXT_PUBLIC_CONTENTFUL_ENVIROMENT!
        );

        const uploadImage = await myEnvironment.createUpload({
            file: tmpImageFile,
        });
        const uploadMovie = await myEnvironment.createUpload({
            file: tmpMovieFile,
        });

        const assetImage = await myEnvironment
            .createAsset({
                fields: {
                    title: {
                        "en-US": post.title,
                    },
                    file: {
                        "en-US": {
                            contentType: contentImageType,
                            fileName: `${post.title}`,
                            uploadFrom: {
                                sys: {
                                    type: "Link",
                                    linkType: "Upload",
                                    id: uploadImage.sys.id,
                                },
                            },
                        },
                    },
                },
            })
            .then((asset) => {
                return asset.processForAllLocales({
                    processingCheckWait: 2000,
                });
            })
            .then((asset) => {
                return asset.publish();
            });

        const assetMovie = await myEnvironment
            .createAsset({
                fields: {
                    title: {
                        "en-US": post.title,
                    },
                    file: {
                        "en-US": {
                            contentType: contentMovieType,
                            fileName: `${post.title}`,
                            uploadFrom: {
                                sys: {
                                    type: "Link",
                                    linkType: "Upload",
                                    id: uploadMovie.sys.id,
                                },
                            },
                        },
                    },
                },
            })
            .then((asset) => {
                return asset.processForAllLocales({
                    processingCheckWait: 2000,
                });
            })
            .then((asset) => {
                return asset.publish();
            });

        await fs.unlink(`./public/image/${tmpfileimagename}`, (err) => {
            if (err) throw err;
        });
        await fs.unlink(`./public/movie/${tmpfilemoviname}`, (err) => {
            if (err) throw err;
        });


        // assetRes.publish();
        // console.log("投稿OK")
        return "success";
    }
});
