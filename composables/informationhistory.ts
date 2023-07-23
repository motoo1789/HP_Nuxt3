export const getCMSContents = async () => {
    const {$client} = useNuxtApp()
    const { data:getContents } = await useAsyncData( () => $client.getEntries())
    
    const contents = getContents.value?.items;
    const parseContents = contents.map(item => item.fields);
    return parseContents
};

export const getCMSContent = () => {
    const cmsComtents = useState("cmsComtents" , () => getCMSContents() );
    return { 
        cmsComtents: readonly(cmsComtents),
    }
}

export const getUpdateInformation = () => { 
    const parseUpdateInformation = async () => {
        const { cmsComtents } = await getCMSContent()

        const contentsValueObject = await cmsComtents.value;
        console.log(contentsValueObject)
        const hobbyArray = contentsValueObject?.filter(cmsContent => {
            return cmsContent.hasOwnProperty('updateDate')
        })
        const afterSortHobbyArray = hobbyArray.sort((a,b) => Date.parse(b.updateDate) - Date.parse(a.updateDate));


        const showMaxInformation = 5;
        const returnPageObject = []
        const contentLength = afterSortHobbyArray.length

        for(let counterPage = 1; counterPage <= Math.ceil(contentLength / showMaxInformation); counterPage++)
        {
            const onePageInformation = afterSortHobbyArray.slice(0, showMaxInformation);
            const pushPageCounterInformationContent = {
                page: counterPage,
                contents: onePageInformation,
            }
            returnPageObject.push(pushPageCounterInformationContent)
            if(afterSortHobbyArray.length > 5)
            {
                for(let counterShift = 0; counterShift < showMaxInformation; counterShift++)
                {
                    afterSortHobbyArray.shift();
                }
            }
            
        }
        return returnPageObject
    };
    return {
        parseUpdateInformation
    }
}

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

