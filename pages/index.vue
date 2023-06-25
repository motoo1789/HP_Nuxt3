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
        <v-row class="blue-b" >
            <v-col class="green-b" cols="12" >
                <v-card-title>
                    ページ概要
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <p>山崎貴弘と申します。</p>
                    <p>Vueを使ってみたくてホームページを作り直しました。</p>
                    <p>プロフィール 最近のニュース 趣味 成果物 などについて紹介をしています。</p>
                    <p>この規模でなんでこんなことしてるの？などいろいろ突っ込みポイントはあるかもしれませんが、</p>
                    <p>暖かく見守ってください(良ければContactから指摘がいただけると勉強になります)</p>
                </v-card-text>
            </v-col>
        </v-row>
    </v-card>
  </div>
</template>

<script setup>
  
  

</script>
