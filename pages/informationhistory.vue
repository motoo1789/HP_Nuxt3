<template>
  <div>
    <InformationHistoryList currentpage="1"/>
    <v-pagination
        v-model="currentpage"
        :length=pageLength
        :total-visible="5"
        @input="onPageChange"
    ></v-pagination>
  </div>
</template>
<script setup>


  let currentpage = 1
  const pageLength = 0
  
  // 初期値をセットする場合
  // const [informationhistory, setInformationhistory] = useState({ histories: homepageNewInformations })
</script>
<style>
</style>