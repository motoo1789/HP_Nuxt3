<template>
    <div>
        <v-progress-linear v-if="loading" indeterminate color="light-blue-accent-3" class="mb-2" />
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
                <v-window v-model="tab">
                    <v-window-item
                        v-for="(animetitles, syllabaryKey) in animes"
                        :key="syllabaryKey"
                        :value="syllabaryKey"
                    >
                        <v-row>
                            <v-col
                                v-for="(animetitle, titleIndex) in animetitles"
                                :key="`${syllabaryKey}-${titleIndex}`"
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
    import { animeContents } from "~/composables/application/hobby/anime";
    import { getComicContents } from "~/composables/application/hobby/comic";
    import { getNovelContents } from "~/composables/application/hobby/novel";
    import { emptyAnimeView, type ViewAnimeContents } from "~/composables/application/hobby/emptyAnimeView";

    const loading = ref(true);
    const animes = ref<ViewAnimeContents>(emptyAnimeView());
    const comics = ref<string[]>([]);
    const novels = ref<string[]>([]);

    const { getAnimeContents } = animeContents();
    const { comicContents } = getComicContents();
    const { novelContents } = getNovelContents();

    onMounted(async () => {
        try {
            const [animeData, comicData, novelData] = await Promise.all([
                getAnimeContents(),
                comicContents(),
                novelContents(),
            ]);
            animes.value = animeData;
            comics.value = comicData ?? [];
            novels.value = novelData ?? [];
        } finally {
            loading.value = false;
        }
    });

    const tab = ref<keyof ViewAnimeContents>("animeA")
    
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