<template>
  <div>
    <v-card
        class="mx-auto"
        shaped="true"
        v-for="(project, key) in projects"
        :key="key"
    >
        <v-container>
            <v-row justify="start">
                <v-col  cols="5"> 
                    <v-img
                        :src="project.img"
                        height="200px"
                    ></v-img>
                </v-col>

                <v-col cols="7">
                    <v-row align="center">
                        <v-col cols="11">
                            <v-card-title > {{ project.title }} </v-card-title>
                        </v-col>
                        <v-cols cols="1">
                            <v-icon
                                large
                                @click="jumpGithubPage(project.url)"
                            >
                                mdi-github                       
                            </v-icon>
                        </v-cols>
                    </v-row>
    
                    <v-divider></v-divider>
                    
                    <v-divider></v-divider>
                    <v-card-title>概要</v-card-title>
                    <v-row class="ma-2" align="center">
                        {{ project.abstract }}
                    </v-row>
                    <v-divider></v-divider>

                    <v-row>
                        <v-col cols="9">
                        </v-col>
                        <v-col cols="3" class="my-2">

                            <div class="text-center">
                                <v-btn 
                                    rounded="lg"
                                    color="infoBlue"
                                    @click.stop="openDialogProjectDetail(project)"
                                >
                                    詳細
                                </v-btn>

                                <v-dialog
                                    v-model="dialog"
                                    width="auto"
                                >
                                    <v-card
                                        class="mx-auto "
                                        :max-width="750"
                                    >
                                        <video controls class="ma-2 movie-size-parent">
                                            <source :src='showDialogProject.movie' type="video/mp4">
                                        </video>
                                        <v-card-text>
                                            <p class="text-h5"> {{ showDialogProject.title }} </p>
                                        </v-card-text>
                                        <v-divider></v-divider>

                                        <v-card-text>
                                            <p class="text-h5"> 開発環境 </p>
                                            <div class="ml-3 mt-4 mb-3">
                                                <v-row class="" style="{width:auto}">

                                                    <v-col xs="4" sm="3" md="3" lg="3" xl="3">
                                                        <v-row  align-content="center">言語</v-row>
                                                        <v-row  align-content="center">フレームワーク</v-row>
                                                        <v-row  align-content="center">ライブラリ</v-row>
                                                    </v-col>
                                                    <v-spacer></v-spacer>
                                                    <v-col cols="7">
                                                        <v-row align-content="center">{{ showDialogProject.environments.language }}</v-row>
                                                        <v-row align-content="center">{{ showDialogProject.environments.framework }}</v-row>
                                                        <v-row align-content="center">{{ showDialogProject.environments.library }}</v-row>
                                                    </v-col>
                                                </v-row>
                                            </div>
                                        </v-card-text>

                                        <v-divider></v-divider>
                                        
                                        <v-card-text>
                                            <p class="text-h5"> 詳細 </p>
                                            <div class="my-1">
                                                {{ showDialogProject.detail }}
                                            </div>
                                        </v-card-text>                                
                                        <v-row >
                                            <v-spacer></v-spacer>
                                            <v-col cols="2" >
                                                <v-btn
                                                    color="blue darken-1"
                                                    :rounded=true
                                                    @click="jumpGithubPage(showDialogProject.url)"
                                                >
                                                    <v-icon
                                                        large
                                                    >
                                                        mdi-github                       
                                                    </v-icon>
                                                </v-btn>
                                            </v-col>
                                            <v-col cols="2" >   
                                                <v-btn
                                                    color="blue darken-1"
                                                    :rounded=true
                                                    @click="closeDialogProjectDetail"
                                                >
                                                    閉じる
                                                </v-btn>
                                            </v-col>
                                            <v-spacer></v-spacer>
                                        </v-row>     
                                    </v-card>
                                </v-dialog>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
    
  </div>
</template>


<script setup lang="ts">
    import { ref } from "vue";
    import { ofetch } from 'ofetch'
    const { data: animes } = await useFetch('/api/anime');
    



    const png_id = "4J3u7b0DkC26yQGjn0DuS0"
	// const id = "4cc9JW3vkGlnH8B97ofmn9"
    const id = "0Spja66f69ipYNQN6Hgv3o";
    const {$client} = useNuxtApp()
    const { data:cms } = await useAsyncData(id,()=> $client.getEntry(id));
    const { data:getContents } = await useAsyncData( () => $client.getEntries())


    

    const contents = getContents.value?.items;


    const parseContents = contents.map(item => item.fields);


    const getContentArray = [];
    parseContents.forEach(tmp => getContentArray.push(tmp))

    

    const projectArray  = getContentArray?.filter(obj => {
        return obj.hasOwnProperty('title')
    })

    // const b = Array.from(a);
    // splitProject = parseContents.map(obj => obj instanceof Proxy ? obj.__target : obj)
    //                       .filter(tmp => tmp.hasOwnProperty('anime'));

    // splitProject = parseContents.filter( tmp => tmp.__target.anime.hasOwnProperty('anime'));

    // splitProject = parseContents.map( content => console.log(content));

    
    const projects = []
    projectArray?.forEach(( content, index ) => {
        const joinContent = {
            projectNum : index,
            title : content.title,
            environments: {
                language: content.language,
                framework: content.framework,
                library: content.library,
            },
            abstract: content.abstract,
            detail: content.detail,
            url: content.github,
            img: content.img.fields.file.url,
            movie: content.movie.fields.file.url,
        }
        projects.push(joinContent)
    });
    // console.log("array push");
    // console.log(projects);

    // const contentful_imgurl = ref(cms.value.fields.hpNuxtMovies[18].fields.file.url)
    
    let dialog = ref(false)

    let selectProjectIndex = ref(-1)
    
    // const projects = [
    //     {
    //         projectNum: 1,
    //         title: "WinRate",
    //         environments: {
    //             language: "Java",
    //             framework:"Eclipse",
    //             library: "OpenCV",
    //         },
    //         abstract: "シャドウバースの勝敗記録をするアプリケーション",
    //         detail: "シャドウバースの勝敗記録をするアプリケーションシャドウバースの勝敗記録をするアプリケーションシャドウバースの勝敗記録をするアプリケーションシャドウバースの勝敗記録をするアプリケーションシャドウバースの勝敗記録をするアプリケーションシャドウバースの勝敗記録をするアプリケーション",
    //         url: "https://github.com/motoo1789/WinRate",
    //         // img: require(`/img/HP用WinRate写真.png`),
    //         // movie: require(`/movie/HP用WinRate.mp4`),
    //         img: "/images/HP用WinRate写真.png",
    //         movie: "/movies/HP用WinRate.mp4"
    //     },
    //     {
    //         projectNum: 2,
    //         title: "UMLDS",
    //         environments: {
    //             language: "Java",
    //             framework:"Eclipse GWT",
    //             library: "JeroMQ GWTUMLDrawer",
    //         },
    //         abstract: "修士研究で作成したアプリケーション描画部分",
    //         detail: "修士研究で作成したアプリケーション修士研究で作成したアプリケーション描画部分修士研究で作成したアプリケーション描画部分修士研究で作成したアプリケーション描画部分修士研究で作成したアプリケーション描画部分修士研究で作成したアプリケーション描画部分",
    //         github: "https://github.com/motoo1789/KIfU-drawer",
    //         img: "/images/HP用UMLDS.png",
    //         movie: "/movies/HP用UMLDS.mp4",
    //     },
    // ]

    let showDialogProject = ref({
        url: URL,
        detail: String,
        environments: {
            language:String,
            framework:String,
            library:String,
        },
        title: String,
        movie:URL,
    })



    const jumpGithubPage = ( url : any) => {
        window.open(url, '_blank')
    }

    const closeDialogProjectDetail = () => {
        dialog.value = false
        console.log(dialog)
    }

    // const openDialogProjectDetail = ( project : any ) => {
    //     console.log(project)
    //     selectProjectIndex.value = projects.indexOf(project)
    //     showDialogProject.value = Object.assign({}, project)
    //     dialog.value = true
    //     console.log(showDialogProject)

    // }

    const openDialogProjectDetail = ( project : any ) => {
        console.log(project)
        selectProjectIndex.value = projects.indexOf(project)
        showDialogProject.value = Object.assign({}, project)
        dialog.value = true
        console.log(showDialogProject)

    }




</script>

<!-- <script setup lang="ts">
    const { data: animes } = await useFetch('/api/anime');
    let dialog = false

    let dialogProjectDetail = false
    let selectProjectIndex = -1
    
    const projects = [
        {
            projectNum: 1,
            title: "WinRate",
            environments: {
                language: "Java",
                framework:"Eclipse",
                library: "OpenCV",
            },
            abstract: "シャドウバースの勝敗記録をするアプリケーション",
            detail: "シャドウバースの勝敗記録をするアプリケーションシャドウバースの勝敗記録をするアプリケーションシャドウバースの勝敗記録をするアプリケーションシャドウバースの勝敗記録をするアプリケーションシャドウバースの勝敗記録をするアプリケーションシャドウバースの勝敗記録をするアプリケーション",
            url: "https://github.com/motoo1789/WinRate",
            // img: require(`/img/HP用WinRate写真.png`),
            // movie: require(`/movie/HP用WinRate.mp4`),
            img: "/images/HP用WinRate写真.png",
            movie: "/movies/HP用WinRate.mp4"
        },
        {
            projectNum: 2,
            title: "UMLDS",
            environments: {
                language: "Java",
                framework:"Eclipse GWT",
                library: "JeroMQ GWTUMLDrawer",
            },
            abstract: "修士研究で作成したアプリケーション描画部分",
            detail: "修士研究で作成したアプリケーション修士研究で作成したアプリケーション描画部分修士研究で作成したアプリケーション描画部分修士研究で作成したアプリケーション描画部分修士研究で作成したアプリケーション描画部分修士研究で作成したアプリケーション描画部分",
            url: "https://github.com/motoo1789/KIfU-drawer",
            img: "/images/HP用UMLDS.png",
            movie: "/movies/HP用UMLDS.mp4",
        },
    ]

    let showDialogProject = Object.assign({}, projects)


    const jumpGithubPage = ( url : any) => {
        window.open(url, '_blank')
    }

    const closeDialogProjectDetail = () => {
        dialog = false
    }

    const openDialogProjectDetail = ( project : any ) => {
        selectProjectIndex = projects.indexOf(project)
        showDialogProject = Object.assign({}, project)
        dialog = true
    }




</script> -->



<style>

</style>
<style>
    .custom-font-color-white {
        color: white,
    }
    .movie-size-parent {
        width: 100%;
    }
</style>