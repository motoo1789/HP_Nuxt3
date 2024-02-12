<template>
    <div>
        <v-card class="mx-auto" shaped="true" v-for="(project, key) in projects" :key="key">
            <v-container>
                <v-row justify="start">
                    <v-col cols="4">
                        <v-img :src="project.img" height="200px"></v-img>
                    </v-col>

                    <v-col cols="8">
                        <v-row align="center">
                            <v-col cols="10">
                                <v-card-title class=""> {{ project.title }} </v-card-title>
                            </v-col>
                            <v-cols> 

                                <div v-if="typeof project.url === 'undefined'">
                                    <v-icon v-bind="props" large class="github-button">
                                            mdi-github
                                    </v-icon>
                                    <v-tooltip
                                        activator="parent"
                                        location="start"
                                    >
                                        Githubはありません
                                    </v-tooltip>
                                </div>

                                
                                <v-icon v-else large  @click="jumpGithubPage(project.url)">
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
                            <v-col class="my-2">

                                <div class="text-center">
                                    <v-btn rounded="lg" color="light-blue-accent-3"
                                        @click.stop="openDialogProjectDetail(project)">
                                        詳細
                                    </v-btn>

                                    <v-dialog v-model="dialog" width="auto">
                                        <v-card class="mx-auto " :max-width="750">
                                            <video controls class="ma-2 video-size">
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
                                                            <v-row align-content="center">言語</v-row>
                                                            <v-row align-content="center">フレームワーク</v-row>
                                                            <v-row align-content="center">ライブラリ</v-row>
                                                        </v-col>
                                                        <v-spacer></v-spacer>
                                                        <v-col cols="7">
                                                            <v-row align-content="center">{{
                                                                showDialogProject.environments.language }}</v-row>
                                                            <v-row align-content="center">{{
                                                                showDialogProject.environments.framework }}</v-row>
                                                            <v-row align-content="center">{{
                                                                showDialogProject.environments.library }}</v-row>
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
                                            <v-row>
                                                <v-spacer></v-spacer>
                                                <v-col cols="2">
  
                                                    <v-btn 
                                                        
                                                        color="light-blue-accent-3" 
                                                        :rounded=true 
                                                        class="github-button"
                                                        v-bind="props"
                                                        v-if="typeof showDialogProject.url === 'undefined'"
                                                    >
                                                        <v-icon  large >
                                                            mdi-github
                                                        </v-icon>
                                                        <v-tooltip
                                                            activator="parent"
                                                            location="top"
                                                        >
                                                            Githubはありません
                                                        </v-tooltip>
                                                    </v-btn> 
 
                                                    
                                            

                                                    <v-btn 
                                                        color="light-blue-accent-3" 
                                                        :rounded=true
                                                        @click="jumpGithubPage(showDialogProject.url)"
                                                        v-else
                                                    >
                                                        <v-icon large>
                                                            mdi-github
                                                        </v-icon>
                                                    </v-btn>



                                                </v-col>
                                                <v-col cols="2">
                                                    <v-btn 
                                                        color="light-blue-accent-3" 
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
import { string } from "yup";
const { data: animes } = await useFetch('/api/anime');
const configContentful = await useRuntimeConfig();


const id = process.env.CONTENTFUL_ENTRY_ID!
const LIMIT = 50;

const { $client } = useNuxtApp()
const { data: getContents } = await useAsyncData(() => $client.getEntries({
    content_type: configContentful.public.contentfulProject,
    limit: LIMIT
}))

const contents = getContents.value?.items;
const parseContents = contents.map(item => item.fields);

const getContentArray = [];
parseContents.forEach(tmp => getContentArray.push(tmp))

const projectArray = getContentArray?.filter(obj => {
    return obj.hasOwnProperty('title')
})

const projects = []
projectArray?.forEach((content, index) => {
    const joinContent = {
        projectNum: index,
        title: content.title,
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

let dialog = ref(false)
let selectProjectIndex = ref(-1)
let showDialogProject = ref({
    url: URL,
    detail: String,
    environments: {
        language: String,
        framework: String,
        library: String,
    },
    title: String,
    movie: URL,
})



const jumpGithubPage = (url: any) => {
    window.open(url, '_blank')
}

const closeDialogProjectDetail = () => {
    dialog.value = false
}

const openDialogProjectDetail = (project: any) => {
    selectProjectIndex.value = projects.indexOf(project)
    showDialogProject.value = Object.assign({}, project)
    dialog.value = true
}

</script>

<style></style>
<style>
.custom-font-color-white {
    color: white,
}

.movie-size-parent {
    width: 100%;
}

.github-button {
    opacity: 0.2;
}

.video-size {
    max-width: 100%;
    max-height: 100%;
}
</style>