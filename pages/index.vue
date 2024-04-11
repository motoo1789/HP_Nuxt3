<template>
  <div>
    <InformationHistoryList currentpage="1"/>
    
    <NuxtLink :to="'/informationhistory'">
      <v-chip variant="text" >
        >> 履歴を見る
      </v-chip>
    </NuxtLink>

    <v-card
        class="mx-auto"
        shaped="true" 
    >
        <v-row >
            <v-col  cols="12" >
                <v-card-title  class="color text-h5">
                    ページ概要
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    
                </v-card-text>
            </v-col>
        </v-row>
    </v-card>
  </div>
</template>

<script setup lang="ts">

  const { init } = useCurrentPage();
  (() => {
    init()
  })()

</script>
