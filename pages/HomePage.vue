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
    <v-table>
        <tbody>
            <tr
            v-for="(newinformation, key) in homepageNewInformations"
            :key="key"
            >
            <td>{{ newinformation.updatedate }}</td>
            <td>{{ newinformation.abstract }}</td>
            </tr>
        </tbody>
    </v-table>

    <!-- ルーターリンクじゃね-->
<!--<router-link :to="{ name: 'InformationHistoryView', params: {page: Number(page) + 1, sample: this.sample } }">
      <v-chip variant="text">
        >> 履歴を見る
      </v-chip>
      >> 履歴を見る
    </router-link> 
-->
    <v-chip variant="text" @click="showNewInformationHistory">
        >> 履歴を見る
    </v-chip>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data () {
    return {
      homepageNewInformations: [
        {
          updatedate: '2022/01/01',
          abstract: "新年の挨拶",
          detaile: "サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年",
        },
        {
          updatedate: '2022/01/02',
          abstract: "サンプル　fdsfsaf",
          detaile: "サンプル　fdsafdsadfasサンプル　fdsafdsadfasサンプル　fdsafdsadfasサンプル　fdsafdsadfasサンプル　fdsafdsadfas",
        },{
          updatedate: '2022/01/03',
          abstract: "サンプル　新年",
          detaile: "サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年",
        },{
          updatedate: '2022/01/04',
          abstract: "サンプル　fdsfsafサンプル　fdsfsaf",
          detaile: " 林檎ゴリラ　サンプル　fdsfsaf",
        },{
          updatedate: '2022/01/05',
          abstract: "キーボードキーボード",
          detaile: "キーボードキーボードキーボードキーボードキーボードキーボード",
        },{
          updatedate: '2022/01/06',
          abstract: "サンプル　新年",
          detaile: "サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年",
        },{
          updatedate: '2022/01/07',
          abstract: "サンプル　新年",
          detaile: "サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年",
        },{
          updatedate: '2022/01/08',
          abstract: "サンプル　新年",
          detaile: "サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年",
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
}
</script>

<style>

</style>