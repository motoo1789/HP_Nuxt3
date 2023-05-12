<template>
    <div>
        {{ articles }}
        <v-card>
            <v-card-title class="text-center justify-center py-6">
                
                    アニメ
            </v-card-title>
            <v-tabs
                v-model="tab"
                bg-color="primary"
                fixed-tabs
                show-arrows
            >
                <v-tab v-for="(tabitem,tabitemkey) in tabitems" :key="tabitemkey" :value=tabitemkey v-on="click()">
                    {{ tab }}
                    {{ tabitem }}
                </v-tab>
                <!-- <v-tab :value=tabitemkey> {{ tabitem }}</v-tab> -->
            </v-tabs>

            <v-card-text>

                <v-window v-model="tab" v-for="(animetitles, animeskey) in articles" :key="animeskey">
                    <v-window-item :value=animeskey> 

                        <v-row>
                            <v-col v-for="(animetitle, animeskey) in animetitles" :key="animeskey"
                                lg="4"    
                                md="6"
                                sm="6"
                                xs="12"
                            >
                                {{ animetitle }}
                            </v-col>
                        </v-row>
                        
                         
                    </v-window-item>
                </v-window>
            </v-card-text>
            <!-- <v-card-text>
                <v-window v-model="tab" v-for="(animetitles, animeskey) in tmp" :key="animeskey">

                    <v-window-item :value=animeskey> 
                        <v-row>
                            <v-col v-for="(animetitle, animeskey) in animetitles" :key="animeskey"
                                lg="4"    
                                md="6"
                                sm="6"
                                xs="12"
                            >   
                                {{ animetitle }}
                                
                            </v-col>
                        </v-row>
 
                    </v-window-item>
                </v-window>
            </v-card-text> -->
        </v-card>
        <v-card>
            <v-card-title class="text-center justify-center py-6">
                マンガ・ライトノベル
            </v-card-title>
            
            <v-container>
                <v-row>
                    <v-col v-for="(mangatitle, mangakey) in hobby.comic" :key="mangakey"
                        lg="4"    
                        md="6"
                        sm="6"
                        xs="12"
                    >
                        {{ mangatitle }}
                    </v-col>
                </v-row>
                <v-divider class="my-2"></v-divider>
                <v-row>
                    <v-col v-for="(lightnoveltitle, lightnovelkey) in hobby.novel" :key="lightnovelkey"
                        xs="12"
                        lg="4"    
                        md="6"
                        sm="6"
                        
                        class="blue-b"
                    >
                        {{ lightnoveltitle }}
                        <!-- <v-list :items="animetitles"></v-list> -->
                    </v-col>
                </v-row>
            </v-container>
            
        </v-card>
    </div>
</template>

<script setup lang="ts">
    let tab = ref(0)

    const { data: articles } = await useFetch('/api/anime');
    console.log(articles)
    console.log(articles.value.a)
    console.log(typeof  articles)
    const click = () => {
        console.log(tab)
    }

    // const tmp = { 
    //     a : [ "色づく世界の明日から", 'アイドルマスター', 'あんハピ' ],
    //     ka: [ 'キャプテンアース', '刀語', '神様のメモ帳' ],
    //     sa: [ '咲', 'サクラクエスト' ],
    //     ta: [ 'デートアライブ', 'ダンまち' ],
    //     na: [ '91', 'ノゲノラ' ],
    //     ha: [ '花咲くいろは', 'ハナヤマタ' ],
    //     ma: [ '魔法科高校の劣等生', 'まどマギ' ],
    //     ya: [ 'よう実', 'やがて君になる' ],
    //     ra: [ 'リトルバスターズ', 'ログ・ホライズン' ],
    //     wa: []
    // }  

    // const tmp2 = { 
    //     "a" : [ '色づく世界の明日から', 'アイドルマスター', 'あんハピ' ],
    //     "ka": [ 'キャプテンアース', '刀語', '神様のメモ帳' ],
    //     "sa": [ '咲', 'サクラクエスト' ],
    //     "ta": [ 'デートアライブ', 'ダンまち' ],
    //     "na": [ '91', 'ノゲノラ' ],
    //     "ha": [ '花咲くいろは', 'ハナヤマタ' ],
    //     "ma": [ '魔法科高校の劣等生', 'まどマギ' ],
    //     "ya": [ 'よう実', 'やがて君になる' ],
    //     "ra": [ 'リトルバスターズ', 'ログ・ホライズン' ],
    //     "wa": []
    // }  

    const tabitems = {
        a:"あ",
        ka:"か",
        sa:"さ",
        ta:"た",
        na:"な",
        ha:"は",
        ma:"ま",
        ya:"や",
        ra:"ら",
        wa:"わ",
    }

</script>

<style>
.blue-b{
    border: 1px blue solid
}
</style>