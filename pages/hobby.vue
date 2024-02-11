<template>
    <div>
        <v-card class="my-2">
            <v-card-title class="text-center justify-center py-3  color">
                    アニメ
            </v-card-title>
            <v-tabs
                v-model="tab"
                fixed-tabs
                show-arrows
                class="color"
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
                                cols="12"
                            >
                                {{ animetitle }}
                            </v-col>
                        </v-row>
                        
                         
                    </v-window-item>
                </v-window>


            </v-card-text>

        </v-card>
        <v-card class="my-2">
            <v-card-title class="text-center justify-center color py-3 ">
                マンガ
            </v-card-title>
            
            <v-container>
                <v-row>
                    <v-col v-for="(comictitle, comickey) in comics" :key="comickey"
                        lg="4"    
                        md="6"
                        sm="6"
                        xs="12"
                        cols="12"
                    >
                        {{ comictitle }}
                    </v-col>
                </v-row>
            </v-container>
            
        </v-card>
        <v-card class="my-2">
            <v-card-title class="text-center justify-center color py-3" >
                ライトノベル
            </v-card-title>
            
            <v-container>
                <v-row>
                    <v-col v-for="(lightnoveltitle, lightnovelkey) in novels" :key="lightnovelkey"
                        lg="4"    
                        md="6"
                        sm="6"
                        xs="12"
                        cols="12"
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
    interface ViewAnimeContents {
        "animeA"  : Array<string>, 
        "animeKa" : Array<string>,
        "animeSa" : Array<string>,
        "animeTa" : Array<string>,
        "animeNa" : Array<string>,
        "animeHa" : Array<string>,
        "animeMa" : Array<string>,
        "animeYa" : Array<string>,
        "animeRa" : Array<string>,
        "animeWa" : Array<string>
    } 

    const { animeContents } = getAnimeContents();
    const animes : ViewAnimeContents | undefined = await animeContents();

    const { comicContents } = getComicContents();
    const comics = await comicContents();

    const { novelContents } = getNovelContents();
    const novels = await novelContents();    

    let tab = ref(1)
    
    const tabitems = {
        "animeA":"あ",
        "animeKa":"か",
        "animeSa":"さ",
        "animeTa":"た",
        "animeNa":"な",
        "animeHa":"は",
        "animeMa":"ま",
        "animeYa":"や",
        "animeRa":"ら",
        "animeWa":"わ",
    }

</script>

<style>
    .blue-b{
        border: 1px blue solid
    }
</style>