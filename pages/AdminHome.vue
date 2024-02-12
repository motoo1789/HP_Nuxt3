<template>
    <div>
        <v-container fluid>
            <v-row dense>
                <v-col v-for="card in adminpageCards" :key="card.title" cols="12" xs="12" sm="12" md="6" lg="6" xl="6"
                    xxl="6">
                    <v-card class="mx-auto" max-width="500" :to=card.link>
                        <v-img :src="card.src" class="align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="200px" cover>
                            <v-card-title class="text-white" v-text="card.title"></v-card-title>
                        </v-img>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <NuxtLink :to="`/AddAcount`" class="link-style-home ">
                        <v-btn type="submit" variant="outlined" color="light-blue-accent-3" block class="mt-2 ">
                            アカウント登録ページ
                        </v-btn>
                    </NuxtLink>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({ middleware: 'auth' })
const adminpageCards = [
    {
        title: "新着情報追加",
        src: "images/kamopis/kamopis_wp2.png",
        link: "addinformation"
    },
    {
        title: "アニメ追加",
        src: "images/kizu.png",
        link: "addanime"
    },
    {
        title: "プロジェクト追加",
        src: "images/desk1.png",
        link: "addproject"
    },
];

</script>

<style scoped>
.blue-b {
    border: 1px blue solid;
}
</style>
