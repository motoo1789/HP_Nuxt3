<template>
    <div>
        <v-card class="mx-auto" max-width="500">
            <v-container fluid>
                <v-row dense>
                    <v-col
                        v-for="card in adminpageCards"
                        :key="card.title"
                        :cols="12"
                    >
                        <v-card>
                            <v-img
                                :src="card.src"
                                class="align-end"
                                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                height="200px"
                                cover
                            >
                                <v-card-title
                                    class="text-white"
                                    v-text="card.title"
                                ></v-card-title>
                            </v-img>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </div>
</template>

<script lang="ts" setup>
const adminpageCards = [
    {
        title: "新着情報追加",
        src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
    },
    {
        title: "プロジェクト追加",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
    },
];
</script>

<style scoped>
.blue-b {
    border: 1px blue solid;
}
</style>
