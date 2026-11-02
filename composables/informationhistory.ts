import { resolveInformationContentType } from "~/utils/contentfulContentTypes";

/**
 * このファイルはinformationの作成の際に呼ばれるのみ
 * 現状componentとpagesで機能がまたがっているから共通の場所として使っていると思われる
 */
export const useCMSContents = async () => {
    const CONTENS_LIMIT = 500;
    const { $client } = useNuxtApp();
    const contentType = resolveInformationContentType(
        useRuntimeConfig().public.contentfulInformationType,
    );

    if (!$client || !contentType) {
        return [];
    }

    const getContents = await $client.getEntries({
        content_type: contentType,
        limit: CONTENS_LIMIT,
    });

    const contents = getContents?.items;
    if (!contents) {
        return [];
    }
    return contents.map((item) => item.fields);
};

export const useCMSContent = () => {
    const cmsComtents = useState("cmsComtents" , () => useCMSContents() );
    return { 
        cmsComtents: readonly(cmsComtents),
    }
}

export const useUpdateInformation = () => { 
    const parseUpdateInformation = async () => {
        const { cmsComtents } = await useCMSContent()

        const contentsValueObject = await cmsComtents.value;
        const hobbyArray = (contentsValueObject ?? []).filter((cmsContent) =>
            cmsContent.hasOwnProperty("updateDate"),
        );
        const afterSortHobbyArray = hobbyArray.sort(
            (a, b) => Date.parse(b.updateDate) - Date.parse(a.updateDate),
        );


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

export const useUpdatePage = (currentpage: Ref<number>) => {
  
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

