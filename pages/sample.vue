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

                            <v-btn 
                                rounded="lg"
                                color="infoBlue"
                                @click.stop="openDialogProjectDetail(project)"
                            >
                                詳細
                            </v-btn>

                            <v-dialog
                                v-model="dialogProjectDetail"
                            >
                                <v-card
                                    class="mx-auto"
                                    :max-width="750"
                                >
                                    <video controls class="ma-2 movie-size-parent">
                                        <source :src="showDialogProject.movie" type="video/mp4">
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
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
  </div>
</template>

<script>

export default {
    layout: 'default',
    data() {
        return {
            dialogProjectDetail: false,
            selectProjectIndex: -1,
            showDialogProject: {},
            projects: [
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
                    img: require(`@/public/img/HP用WinRate写真.png`),
                    movie: require(`@/public/movie/HP用WinRate.mp4`),
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
                    img: require(`@/public/img/HP用UMLDS.png`),
                    movie: require(`@/public/movie/HP用UMLDS.mp4`),
                },
            ],
        }
    },
    methods: {
        jumpGithubPage( url ) {
            window.open(url, '_blank')
        },
        closeDialogProjectDetail() {
            this.dialogProjectDetail = false
        },
        openDialogProjectDetail( project ) {
            this.selectProjectIndex = this.projects.indexOf(project)
            this.showDialogProject = Object.assign({}, project)
            this.dialogProjectDetail = true
        },
    },

}
</script>

<style>

</style>