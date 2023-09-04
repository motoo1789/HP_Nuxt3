import contentful from "contentful-management";
import path from "path";
import fs from "fs";

interface POSTFormat {
    title: string;
    abstract: string;
    detaile: string;
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
        //tmpファイルの作成をし読み取る処理が必要らしい
        await fs.writeFileSync(`./tmp/${tmpfileimagename}`, imageFileData, {
            encoding: "base64",
        });
        await fs.writeFileSync(`./tmp/${tmpfilemoviname}`, movieFileData, {
            encoding: "base64",
        });
        const tmpImageFilePath = await path.resolve("/tmp", tmpfileimagename);
        const tmpImageFile = await fs.readFileSync(tmpImageFilePath);

        const tmpMovieFilePath = await path.resolve("/tmp", tmpfilemoviname);
        const tmpMovieFile = await fs.readFileSync(tmpMovieFilePath);

        // 初期化
        const client = contentful.createClient({
            accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_API_KEY!,
            // host: "api.contentful.com", // ホストは共通なので.envに記載しない
        });
        const mySpace = await client.getSpace(
            process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!
        );
        const myEnvironment = await mySpace.getEnvironment(
            process.env.NEXT_PUBLIC_CONTENTFUL_ENVIROMENT!
        );

        // enviromentにメディアをupload
        const uploadImage = await myEnvironment.createUpload({
            file: tmpImageFile,
        });
        const uploadMovie = await myEnvironment.createUpload({
            file: tmpMovieFile,
        });

        // プロ画のアセット生成
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

        // 動画のアセット生成
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

        // entryの作成
        await myEnvironment.createEntry(process.env.NEXT_PUBLIC_CONTENTFUL_CONTENT_TYPE_PROJECT!, {
            fields: {
                title: {
                    'en-US': post.title
                },
                abstract: {
                    'en-US': post.abstract
                },
                detail: {
                    'en-US': post.detaile
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
                createdDate: {
                    'en-US': post.createdProjectDate
                },
                img: {
                    "en-US": {
                        "sys": {
                            "type": "Link",
                            "linkType": "Asset",
                            "id": assetImage.sys.id
                        }
                    }
                },
                movie: {
                    'en-US': {
                        "sys": {
                            "type": "Link",
                            "linkType": "Asset",
                            "id": assetMovie.sys.id
                        }
                    }
                }
            }
        }).then((postProject) => {
            return postProject.publish();
        });

        // tmpファイルを削除
        await fs.unlink(`./tmp/${tmpfileimagename}`, (err) => {
            if (err) throw err;
        });
        await fs.unlink(`./tmp/${tmpfilemoviname}`, (err) => {
            if (err) throw err;
        });

        console.log("投稿OK")
        return "success";
    }
});
