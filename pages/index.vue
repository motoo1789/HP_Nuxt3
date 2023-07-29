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
                    <p>山崎貴弘と申します。</p>
                    <p>Vueを使ってみたくてホームページを作り直しました。</p>
                    <p>プロフィール 最近のニュース 趣味 成果物 などについて紹介をしています。</p>
                    <p>使用技術：Nuxt3 Vuetify Vercel Contentful Newt</p>
                    <p>この規模でなんでこんなことしてるの？などいろいろ突っ込みポイントはあるかもしれませんが、</p>
                    <p>暖かく見守ってください(コンタクトから指摘がいただけると勉強になります)</p>
                </v-card-text>
            </v-col>
        </v-row>
    </v-card>
  </div>
</template>

<script setup>
  
  

</script>
