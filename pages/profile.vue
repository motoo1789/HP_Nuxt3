<template>
    <v-container>
       
            <v-card class="mx-auto" shaped="true">
                <v-container>
                    <v-row>
                        <v-col class="hidden-md-and-down"  cols=3>
                            <v-img class="" src="/images/profile_face.png" height="200px" />
                        </v-col>

                        <v-col>
                            <v-row>
                                <v-col cols="12">
                                    <v-card-title  class="color text-h5 rounded-t">
                                        名前 山崎 貴弘
                                    </v-card-title>
                                </v-col>

                            </v-row>
                            <v-divider></v-divider>
                            <v-card-text>
                                <div> 小学生の頃にゲームが作りたくて工業高校情報科に進学。進学後プログラミングの面白さはゲーム作りだけではないと気づき、エンジニアになるため情報科の大学へ進学を決意。
                                    大学で勉強をしていく中でソフトウェアの作り方について知識をつけたいと考えソフトウェア工学を大学院まで研究していました。
                                    研究の影響もあり、将来はアーキテクトに強いエンジニアになります。
                                    とは言いながらも趣味を捨てきることができない人間で、ゲームやアニメ、ライトノベル、漫画など自分を形成してきた文化を大切にしていきながら仕事をしていきたいです。
                                </div>
                            </v-card-text>

                        </v-col>
                    </v-row>
                </v-container>
            </v-card>

            <v-card class="mx-auto">
                <v-container>
                    <v-row align="center">
                        <v-col class="hidden-md-and-down" cols="3">
                            <v-layout>
                                <v-img class="mx-auto " src="images/career.png" height="200px"></v-img>
                            </v-layout>

                        </v-col>

                        <v-col>
                            <v-row>
                                <v-col cols="12">
                                    <v-card-title class="color text-h5 rounded-t">
                                        経歴
                                    </v-card-title>
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>

                            <v-timeline class="my-1" side="end">
                                <v-timeline-item v-for="history in histories" :key="history.id" dot-color="#42A5F5">
                                    {{ history.text }}

                                </v-timeline-item>
                            </v-timeline>

                            <v-row>
                                <v-col cols="12">
                                    <v-card-title class="color text-h5 rounded-t">
                                        資格
                                    </v-card-title>
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-list :items="qualifications" item-title="name"></v-list>

                        </v-col>
                    </v-row>
                </v-container>

            </v-card>

            <v-card class="mx-auto">
                <v-container>
                    <v-row align="center">
                        <v-col class="hidden-md-and-down" cols="3">
                            <v-img src="images/presentation.png" height="200px"></v-img>
                        </v-col>

                        <v-col>
                            <v-row>
                                <v-col cols="12">
                                    <v-card-title class="color text-h5 rounded-t">
                                        発表
                                    </v-card-title>
                                </v-col>
                            </v-row>

                            <v-divider></v-divider>

                            <v-table>
                                <thead>
                                    <tr>
                                        <th class="text-left">
                                            日付
                                        </th>
                                        <th class="text-left">
                                            タイトル
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="presentation in presentations" :key="presentation.id">
                                        <td>{{ presentation.date }}</td>

                                        <td>
                                            <a :href="presentation.url">{{ presentation.title }}</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </v-col>
                    </v-row>
                </v-container>

            </v-card>
            <v-card class="mx-auto" shaped="true">
                <v-container>
                    <v-row align="center">
                        <v-col class="hidden-md-and-down" cols="3">
                            <v-img src="images/skill.png" height="200px"></v-img>
                        </v-col>

                        <v-col>

                            <v-row>
                                <v-col cols="12">
                                    <v-card-title class="color text-h5 rounded-t">
                                        スキル（自己評価）
                                    </v-card-title>
                                </v-col>
                            </v-row>

                            <v-divider></v-divider>

                            <v-row>
                                <v-col v-for="(rating, key) in ratings" :key="key" :align-self="center" lg="4" md="6"
                                    sm="12" xs="12">

                                    <div v-bind:style="styleSize" class="ma-2">
                                        {{ rating.skill }}
                                    </div>
                                    <v-rating :model-value="rating.value" readonly="true" color="#82b0ff">
                                    </v-rating>

                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>

    </v-container>
</template>

<script setup lang="ts">
import { mdiTableArrowUp } from '@mdi/js';
import { ref } from "vue";

    const sampleicon:string = "mdi-table-arrow-up"
    const histories = [
        {
            id: 1,
            text: "日本工業大学工学部情報工学科 卒業",
        },
        {
            id: 2,
            text: "日本工業大学工学研究科電子情報メディア工学専攻博士前期課程 修了"
        },
        {
            id: 3,
            text: "株式会社ディマージシェア"
        },
    ];

    const presentations = [
        {
            id : 1,
            date: '2021-02-23',
            title: 'パターンの役割違反に着目したコード品質改善手法の提案',
            url: "https://www.ieice-taikai.jp/2021general/jpn/index.html"

        },
        {
            id : 2,
            date: '2022-01-21',
            title: 'クラス図とソースコード間のラウンドトリップエンジニアリング支援ツール',
            url: "https://ken.ieice.org/ken/program/index.php?tgs_regid=c7e66ae8eec06d72f88ac1147e021d278969659589d143d7de3bb4d5e2aaa315&tgid=IEICE-KBSE"
        },
        {
            id : 3,
            date: '2023-02-20',
            title: 'A Tool for Supporting Round-Trip Engineering with the Ability to Avoid Unintended Design Changes',
            url: "https://www.insticc.org/node/TechnicalProgram/modelsward/2023/presentationDetails/116675"
        },
    ];


    const styleSize = () => {
        return {
            width: "100px",
        }
    }

    const ratings = [
        { skill: "Java", value: "2" },
        { skill: "Docker", value: "1" },
        { skill: "Vue", value: "1" },
        { skill: "Nuxt", value: "1" },
        { skill: "JavaScript", value: "1" },

    ];
    const qualifications = [
        { name: "ITパスポート" },
        { name: "基本情報技術者" },
        { name: "応用情報技術者" },
        { name: "AWS Certified Cloud Practitioner" },
        { name: "普通自動車免許" }
    ]
    const isExternalLink = (path:string) => {
            const pattern = /^(http|https|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|]/i;
            return pattern.test(path)
        };
    const calcSkilTextSize = () => {
        const maxLength = Math.max(...ratings.map(item => item.skill.length)) * 10
        return String(maxLength) + "px";
    }


</script>

<style>
.blue-b {
    border: 1px blue solid
}

.svg__container {
    position: relative;
    width: 100%;
}

.svg__content {
    position: absolute;
    top: 0;
    left: 0;
}
</style>