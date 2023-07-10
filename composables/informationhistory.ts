const {$client} = useNuxtApp()
const id = "4aRueTYaQFRMv4drT6irTy";
//const { data:cms } = await useAsyncData(id ,()=> $client.getEntries())
// const { data:cms } = await useAsyncData(id ,()=> $client.getEntry(id))
const { data:cms } = await useAsyncData(id ,()=> $client.getEntries({content_type: 'newInformation'}))


console.log(cms);
const { data:getContents } = await useAsyncData( () => $client.getEntries())

export const updatePage = (currentpage: Ref<number>) => {
    return (nextpage: number) => (currentpage.value = nextpage);
}

export const useCurrentPage = () => {
  const currentpage = useState('currentpage', () => { return 1 })
  /*
    HACK: v-paginationのpageに0がおそらく設定できないのでcurrentpageは1じゃないといけない気がする
          ただしInformationHistoryListでは配列でcurrentpageを0から使いたいのが問題
  */
  const updatePage = (currentpage: Ref<number>) => {
    return (nextpage: number) => (currentpage.value = nextpage);
  }

  return {
    currentpage,
    updatePage,
  } 
   
}

export const useInformationHisotry = () => {
    
    const hisotory = useState('hisotory', () => {
        return [
            {
              page: 1,
              contents: [
                {
                  updatedate: '2023/03/20',
                  abstract: "日本工業大学修了",
                  detaile: "サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年",
                },
                {
                  updatedate: '2023/02/20',
                  abstract: "MODELSWARD発表",
                  detaile: "サンプル　fdsafdsadfasサンプル　fdsafdsadfasサンプル　fdsafdsadfasサンプル　fdsafdsadfasサンプル　fdsafdsadfas",
                },
                {
                  updatedate: '2023/02/13',
                  abstract: "修士研究公聴会",
                  detaile: "サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年",
                },
                {
                  updatedate: '2022/01/04',
                  abstract: "サンプル　fdsfsafサンプル　fdsfsaf",
                  detaile: " 林檎ゴリラ　サンプル　fdsfsaf",
                },
                {
                  updatedate: '2022/01/01',
                  abstract: "あけましておめでとうございます",
                  detaile: "今年もよろしくお願いします",
                }
              ]
            },
            {
              page: 2,
              contents: [
                {
                  updatedate: '2023/03/20',
                  abstract: "あいうえおあいうえお",
                  detaile: "サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年",
                },
                {
                  updatedate: '2023/02/20',
                  abstract: "MODELSWARD発表",
                  detaile: "サンプル　fdsafdsadfasサンプル　fdsafdsadfasサンプル　fdsafdsadfasサンプル　fdsafdsadfasサンプル　fdsafdsadfas",
                },
                {
                  updatedate: '2023/02/13',
                  abstract: "修士研究公聴会",
                  detaile: "サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年サンプル　新年",
                },
                {
                  updatedate: '2023/02/09',
                  abstract: "学部生　卒業研究発表会聴講",
                  detaile: " 林檎ゴリラ　サンプル　fdsfsaf",
    
                },
                {
                  updatedate: '2022/01/01',
                  abstract: "あけましておめでとうございます",
                  detaile: "今年もよろしくお願いします",
    
                },
              ]
            },
            
          ];
          
    })
    // const getPageLength = () => { history.length };
    return { 
        informationhisotory: readonly(hisotory),
    }
    
  }