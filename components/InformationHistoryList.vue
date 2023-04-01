<template>
  <div>
    <div class="text-subtitle-2 mb-2">新着情報</div>
    <v-expansion-panels>
        <v-expansion-panel
            v-for="(newinformation, key) in informationhisotory[currentpage].contents"
            :key="key"
        >
            <v-expansion-panel-title>{{ newinformation.updatedate }}   {{ newinformation.abstract }}</v-expansion-panel-title>
          <v-expansion-panel-text>{{ newinformation.detaile }}</v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>

    <!-- <v-expansion-panels>
        <v-expansion-panel
            v-for="(newinformation, key) in tmp" :key="key"
        >
          <v-expansion-panel-text>{{ newinformation.a }}</v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels> -->
  </div>
</template>

<script  setup>
import { createURL } from 'ufo';

const {informationhisotory, currentpage} = useInformationHisotry();
 
// interface Props {
//   currentpage: number;

// }
// const Props = withDefaults(defineProps<Props>(), {
//   currentpage: 1
// });

const tmp = [
  {a:"aaa",b:"bbb"  }
]

// const homepageNewInformations =  [
//         {
//           page: 1,
//           contents: [
//             {
//               updatedate: '2023/03/20',
//               abstract: "日本工業大学修了",
//               detaile: "サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年",
//             },
//             {
//               updatedate: '2023/02/20',
//               abstract: "MODELSWARD発表",
//               detaile: "サンプル　fdsafdsadfasサンプル　fdsafdsadfasサンプル　fdsafdsadfasサンプル　fdsafdsadfasサンプル　fdsafdsadfas",
//             },
//             {
//               updatedate: '2023/02/13',
//               abstract: "修士研究公聴会",
//               detaile: "サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年",
//             },
//             {
//               updatedate: '2022/01/04',
//               abstract: "サンプル　fdsfsafサンプル　fdsfsaf",
//               detaile: " 林檎ゴリラ　サンプル　fdsfsaf",
//             },
//             {
//               updatedate: '2022/01/01',
//               abstract: "あけましておめでとうございます",
//               detaile: "今年もよろしくお願いします",
//             }
//           ]
//         },
//         {
//           page: 2 ,
//           contents: [
//             {
//               updatedate: '2023/03/20',
//               abstract: "日本工業大学修了",
//               detaile: "サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年",
//             },
//             {
//               updatedate: '2023/02/20',
//               abstract: "MODELSWARD発表",
//               detaile: "サンプル　fdsafdsadfasサンプル　fdsafdsadfasサンプル　fdsafdsadfasサンプル　fdsafdsadfasサンプル　fdsafdsadfas",
//             },
//             {
//               updatedate: '2023/02/13',
//               abstract: "修士研究公聴会",
//               detaile: "サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年",
//             },
//             {
//               updatedate: '2023/02/09',
//               abstract: "学部生　卒業研究発表会聴講",
//               detaile: " 林檎ゴリラ　サンプル　fdsfsaf",

//             },
//             {
//               updatedate: '2022/01/01',
//               abstract: "あけましておめでとうございます",
//               detaile: "今年もよろしくお願いします",

//             },
//           ]
//         }
//       ];
// const homepageNewInformations = [
  
//     {
//       updatedate: '2023/03/20',
//       abstract: "日本工業大学修了",
//       detaile: "サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年",
//     },
//     {
//       updatedate: '2023/02/20',
//       abstract: "MODELSWARD発表",
//       detaile: "サンプル　fdsafdsadfasサンプル　fdsafdsadfasサンプル　fdsafdsadfasサンプル　fdsafdsadfasサンプル　fdsafdsadfas",
//     },{
//       updatedate: '2023/02/13',
//       abstract: "修士研究公聴会",
//       detaile: "サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年",
//     },{
//       updatedate: '2023/02/09',
//       abstract: "学部生　卒業研究発表会聴講",
//       detaile: " 林檎ゴリラ　サンプル　fdsfsaf",
//     },{
//       updatedate: '2022/01/01',
//       abstract: "あけましておめでとうございます",
//       detaile: "今年もよろしくお願いします",
//     },
//     {
//       updatedate: '2023/03/20',
//       abstract: "日本工業大学修了",
//       detaile: "サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年",
//     },
//     {
//       updatedate: '2023/02/20',
//       abstract: "MODELSWARD発表",
//       detaile: "サンプル　fdsafdsadfasサンプル　fdsafdsadfasサンプル　fdsafdsadfasサンプル　fdsafdsadfasサンプル　fdsafdsadfas",
//     },{
//       updatedate: '2023/02/13',
//       abstract: "修士研究公聴会",
//       detaile: "サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年",
//     },{
//       updatedate: '2023/02/09',
//       abstract: "学部生　卒業研究発表会聴講",
//       detaile: " 林檎ゴリラ　サンプル　fdsfsaf",
//     },{
//       updatedate: '2022/01/01',
//       abstract: "あけましておめでとうございます",
//       detaile: "今年もよろしくお願いします",
//     },
//   ]
  

</script>

<style>

</style>