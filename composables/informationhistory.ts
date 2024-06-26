/**
 * このファイルはinformationの作成の際に呼ばれるのみ
 * 現状componentとpagesで機能がまたがっているから共通の場所として使っていると思われる
 */
import type { Ref } from 'vue'

export const useUpdatePage = (currentpage: Ref<number>) => {
    return (nextpage: number) => (currentpage.value = nextpage);
}

export const init = (currentpage: Ref<number>) => () => currentpage.value = 1;

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
    init: init(currentpage)
  } 
   
}

