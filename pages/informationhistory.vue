<template>
  <div>
    <InformationHistoryList />
    <v-pagination
        v-model="currentpage"
        :length="informationhisotory.length"
        :total-visible="5"
        @click="pushPagination"
    ></v-pagination> 
    <v-row>
      <v-btn
        color="light-blue-accent-3"
        :rounded=true
        :to="`/`"
        class="mx-auto my-5"
      >
        HOME
      </v-btn>
    </v-row>

    

    <!-- HACK:length informationhistoryの存在を知らないといけないのはまずい気がするので後で直す-->
    
  </div>
</template>
<script setup lang="ts">

const { currentpage, updatePage } =  useCurrentPage();
// const { informationhisotory } =  useInformationHisotry();
//const { getContent } =  getCMSContent();
const { getInformationContents } = informationContents();
const informationhisotory = await getInformationContents();

const pushPagination = () => {
  updatePage(currentpage)
}
  // 初期値をセットする場合
  // const [informationhistory, setInformationhistory] = useState({ histories: homepageNewInformations })
</script>
<style>
</style>