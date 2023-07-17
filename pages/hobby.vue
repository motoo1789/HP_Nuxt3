<template>
    <div>
        <v-card class="my-2">
            <v-card-title class="text-center justify-center py-6">
                
                    アニメ
            </v-card-title>
            <v-tabs
                v-model="tab"
                bg-color="primary"
                fixed-tabs
                show-arrows
            >
                <v-tab v-for="(tabitem,tabitemkey) in tabitems" :key="tabitemkey" :value=tabitemkey>
                    {{ tabitem }}
                </v-tab>
                <!-- <v-tab :value=tabitemkey> {{ tabitem }}</v-tab> -->
            </v-tabs>

            <v-card-text>

                <v-window v-model="tab" v-for="(animetitles, animeskey) in animes" :key="animeskey">
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

                <!--
                    <v-window v-model="tab" v-for="(animetitles, animeskey) in animes" :key="animeskey">
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
                -->
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
        <v-card class="my-2">
            <v-card-title class="text-center justify-center py-6">
                マンガ
            </v-card-title>
            
            <v-container>
                <v-row>
                    <v-col v-for="(comictitle, comickey) in comics" :key="comickey"
                        lg="4"    
                        md="6"
                        sm="12"
                        xs="12"
                    >
                        {{ comictitle }}
                    </v-col>
                </v-row>
            </v-container>
            
        </v-card>
        <v-card class="my-2">
            <v-card-title class="text-center justify-center py-6">
                ライトノベル
            </v-card-title>
            
            <v-container>
                <v-row>
                    <v-col v-for="(lightnoveltitle, lightnovelkey) in novels" :key="lightnovelkey"
                        lg="4"    
                        md="6"
                        sm="12"
                        xs="12"
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
    const {$client} = useNuxtApp()
    const { data:getContents } = await useAsyncData( () => $client.getEntries())

    const contents = getContents.value?.items;
    const parseContents = contents.map(item => item.fields);
    const getContentArray = [];
    parseContents.forEach(content => getContentArray.push(content))

    const hobbyArray = getContentArray?.filter(obj => {
        return obj.hasOwnProperty('anime')
    })

    

    const animes = hobbyArray[0].anime;
    const comics = hobbyArray[0].book.comic
    const novels = hobbyArray[0].book.novel


    let tab = ref(1)
    // const { data: animes } = await useFetch('/api/anime');
    // const { data: comics } = await useFetch('/api/comic');
    // const { data: novels } = await useFetch('/api/novel');

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