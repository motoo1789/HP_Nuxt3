<template>
  <div>
    <div class="text-subtitle-2 mb-2">新着情報</div>
        <v-expansion-panels>
            <v-expansion-panel
                v-for="(newinformation, key) in homepageNewInformations"
                :key="key"
                
            >
                <v-expansion-panel-title>{{ newinformation.updatedate }}   {{ newinformation.abstract }}</v-expansion-panel-title>
              <v-expansion-panel-text>{{ newinformation.detaile }}</v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    <!-- <v-table>
        <tbody>
            <tr
            v-for="(newinformation, key) in homepageNewInformations"
            :key="key"
            >
            <td>{{ newinformation.updatedate }}</td>
            <td>{{ newinformation.abstract }}</td>
            </tr>
        </tbody>
    </v-table> -->


    <v-chip variant="text" @click="showNewInformationHistory">
        >> 履歴を見る
    </v-chip>

    <v-card
        class="mx-auto"
        shaped="true"
        
    >
        <v-row class="blue-b" justify="start">
            <v-col class="green-b" cols="7">
                <v-card-title>
                    ページ概要
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <p>山崎貴弘と申します。</p>
                    <p>Vueを使ってみたくてホームページを作り直しました。</p>
                    <p>プロフィール 最近のニュース 趣味 成果物 などについて紹介をしています。</p>
                    <p>この規模でなんでこんなことしてるの？などいろいろ突っ込みポイントはあるかもしれませんが、暖かく見守ってください(良ければContactから指摘がいただけると勉強になります)</p>
                </v-card-text>
            </v-col>
        </v-row>
    </v-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

// Components
export default defineComponent({
  layout: "default",
  data () {
    return {
      homepageNewInformations: [
        {
          updatedate: '2023/03/20',
          abstract: "日本工業大学修了",
          detaile: "サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年",
        },
        {
          updatedate: '2023/02/20',
          abstract: "MODELSWARD発表",
          detaile: "サンプル　fdsafdsadfasサンプル　fdsafdsadfasサンプル　fdsafdsadfasサンプル　fdsafdsadfasサンプル　fdsafdsadfas",
        },{
          updatedate: '2023/02/13',
          abstract: "修士研究公聴会",
          detaile: "サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年",
        },{
          updatedate: '2023/02/09',
          abstract: "学部生　卒業研究発表会聴講",
          detaile: " 林檎ゴリラ　サンプル　fdsfsaf",
        },{
          updatedate: '2022/01/01',
          abstract: "あけましておめでとうございます",
          detaile: "今年もよろしくお願いします",
        },
      ],
      books: [
        {page: 1, title:'タイトル1', content:'本の内容1'},
        {page: 2, title:'タイトル2', content:'本の内容2'}
      ],
      index: 0
      
    }
  },
  methods : {
      showNewInformationHistory() {
          console.log("チップをクリックしました")
          this.$router.push({
            name:'InformationHistoryList',
            params:{
              books: this.books,
            }
          })
      }
  }
});
</script>
