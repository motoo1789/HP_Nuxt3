<template>
    <v-container>
    <div>
    <v-card
        class="mx-auto"
        shaped="true"
        
    >
        <v-row  >
            <v-col class="red-b" cols="3">
                <v-img
                    src="/images/profile_face.png"
                    height="200px"
                />
            </v-col>

            <v-col class="green-b" cols="9">
                <v-card-title>
                    名前 山崎 貴弘
                </v-card-title>
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
    </v-card>

    <v-card
        class="mx-auto"
        
    >
        <v-container>
            <v-row align="center">
                <v-col cols="3">
                    
                    <v-layout>
                        <v-img
                            class="mx-auto "
                            src="images/career.png"
                            height="200px"
                        ></v-img>
                    </v-layout>
                    
                </v-col>

                
                <v-col  cols="9">
                    <!-- <v-banner
                        lines="one"
                        icon="mdi-lock"
                        color="deep-purple-accent-4"
                        class="my-4"
                    >
                        <v-banner-text>
                            <v-timeline class="my-2" side="end">
                                <v-timeline-item  
                                    v-for="history in histories"
                                    :key="history.id"
                                    dot-color="#82b0ff"
                                >
                                    {{ history.text }}
                                    
                                </v-timeline-item>
                                
                                
                            </v-timeline>
                        </v-banner-text>                
                    </v-banner> -->
                    <v-row class="my-2">
                        <v-col cols="9" >
                            <div class="text-h6">経歴</div>
                            <v-divider></v-divider>
                            <v-timeline class="my-2" side="end">
                                <v-timeline-item  
       
                                    v-for="history in histories"
                                    :key="history.id"
                                    dot-color="#82b0ff"
                                >
                                    {{ history.text }}
                                    
                                </v-timeline-item>
                            </v-timeline>
                        </v-col>
                        
                    </v-row>
                    <v-row>
                        <v-col cols="9">
                            <div class="text-h6 mt-2 ">資格</div>
                            <v-divider></v-divider>
                            <v-list
                                :items="qualifications"
                                item-title="name"
                            ></v-list>
                        </v-col>
                    </v-row>
                </v-col>
                    

            </v-row>
        </v-container>
        
    </v-card>

    <v-card
        class="mx-auto"
        
    >
        <v-container>
            <v-row  align="center">
                <v-col  cols="3">
                    <v-img
                        src="images/presentation.png"
                        height="200px"
                    ></v-img>
                </v-col>

                <v-col class="green-b" cols="9">
                    <div class="text-h6">発表</div>
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
                            <tr
                                v-for="presentation in presentations"
                                :key="presentation.name"
                            >
                                <td>{{ presentation.date }}</td>
                                <!-- <component 
                                    :is="isExternalLink(presentation.url) ? 'a' : 'nuxt-link'"
                                    :href="isExternalLink(presentation.url) ? presentation.url : ''"
                                    :to="isExternalLink(presentation.url) ? '' : ''" 
                                >
                                    <td>{{ presentation.title }}</td>

                                </component> -->
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
    <v-card
        class="mx-auto"
        shaped="true"
    >
        <v-container>
            <v-row  align="center">
                <v-col class="red-b" cols="3">
                    <v-img
                        src="images/skill.png"
                        height="200px"
                    ></v-img>
                </v-col>

                <v-col class="green-b" cols="9">
                    <div class="text-h6">スキル（自己評価）</div>
                    <v-divider></v-divider>
                    <!-- <div 
                        v-for="(rating, key) in ratings"
                        :key="key"
                        class="blue-b rating-container"
                    > -->
                        <!-- <div ckass="rating-label">{{ rating.skill }}</div>
                        <v-rating
                            :model-value="rating.value"
                            readonly="true"
                            color="#82b0ff"
                            class="blue-b"
                        >
                        </v-rating> -->

                        
                        <v-row class="my-2">
                            <v-col  
                                v-for="(rating, key) in ratings"
                                :key="key"
                                :align-self="center"
                                lg="4"
                                md="6"
                                sm="12"
                                xs="12"
                            >
                                <v-row align="center">
                                    
                                        <div v-bind:style="styleSize" class="ma-2">
                                            {{ rating.skill }}
                                        </div>
                                        <v-rating
                                            :model-value="rating.value"
                                            readonly="true"
                                            color="#82b0ff"
                                        >
                                        </v-rating>

                                </v-row>
                            </v-col>
                        </v-row>               
                </v-col>
            </v-row>
        </v-container>
    </v-card>
    <!-- <v-card
        class="mx-auto"
        shaped="true"
        
    >
        <v-row class="blue-b" justify="start">
            <v-col class="red-b svg_container" cols="3"> 資格
                <v-icon x-large :icon="sampleicon"></v-icon>
                
            </v-col>

            <v-col class="green-b" cols="9">
                <v-list
                    :items="qualifications"
                    item-title="name"
                ></v-list>
            </v-col>
        </v-row>
    </v-card> -->
    
  </div>
    </v-container>
</template>

<script>
import { mdiTableArrowUp  } from '@mdi/js';
import SvgIcon from "@jamescoyle/vue-icon";
export default {
    
    components: {
        SvgIcon
    },
    data() {
        return {
            img1 : ref(),
            
            //img: require('~/assets/img/profile_face.png'),
            sampleicon: "mdi-table-arrow-up",
            path: mdiTableArrowUp ,
            histories: [
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
            ],
            presentations: [
                {
                    date: '2021-02-23',
                    title: 'パターンの役割違反に着目したコード品質改善手法の提案',
                    url: "https://www.ieice-taikai.jp/2021general/jpn/index.html"

                },
                {
                    date: '2022-01-21',
                    title: 'クラス図とソースコード間のラウンドトリップエンジニアリング支援ツール',
                    url: "https://ken.ieice.org/ken/program/index.php?tgs_regid=c7e66ae8eec06d72f88ac1147e021d278969659589d143d7de3bb4d5e2aaa315&tgid=IEICE-KBSE"
                },
                {
                    date: '2023-02-20',
                    title: 'A Tool for Supporting Round-Trip Engineering with the Ability to Avoid Unintended Design Changes',
                    url: "https://www.insticc.org/node/TechnicalProgram/modelsward/2023/presentationDetails/116675"
                },
            ],
            maxsize: '100px',
            // styleSize: { 勉強用に残しておく
            //     width: "",
            //     color: "red"
            // },
            ratings: [
                { skill: "Java", value: "2" },
                { skill: "Docker", value: "2" },
                { skill: "Vue", value: "1" },
            ],
            qualifications: [
                { name: "ITパスポート" },
                { name: "基本情報技術者" },
                { name: "普通自動車免許" }
            ]
            
        }
    },
    computed : {
        styleSize() {
            return {
                width: this.maxsize,
            }
        }
    },
    created() {
        this.maxsize = this.calcSkilTextSize()

        // this.styleSize.width = this.maxsize 直接指定する場合はオブジェクトの中まで指定する
        // this.calcSkilTextSize();
    },
    methods: {
        isExternalLink(path)
        {
            const pattern = /^(http|https|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|]/i;
            return pattern.test(path)
        },
        calcSkilTextSize() {
            const maxLength = Math.max(...this.ratings.map(item => item.skill.length)) * 10
            return String(maxLength) + "px";
        }

        
    }
    
}
</script>

<style>
.blue-b{
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