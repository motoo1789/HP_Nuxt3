export interface BaseRepository {
    findByState() : Object | boolean
    findByCMS() : Object | boolean
    saveToState(cmsContents : Array<Object>) : Object;
    saveToCMS() : Object;
}


export class AnimeRepository implements BaseRepository {

    constructor() {
        console.log("ああああ");
    }

    findByState() : Object | boolean{
        if(false) {
            return {a : "aaa"};
        }
        return false;
    }

    findByCMS() : Object | boolean {
        
        if(true) {
            return {a : "aaa"};
        }
        return false;
    }

    saveToState(cmsContents : Array<Object>) : Object {
        // a:(27) ['アイドルマスターシリーズ', 'アウトブレイク・カンパニー', 'アクセル・ワールド', 
        // この形で保存したい
        console.log("saveToState");
        console.log(cmsContents);
        return {}
    }

    saveToCMS() : Object {
        return {}
    }

}

// 正規化
// const contents = getContents.value?.items;
// const parseContents = contents.map(item => item.fields);