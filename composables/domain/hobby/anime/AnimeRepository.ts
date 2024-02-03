export interface BaseRepository {
    findByState()   : Object | boolean
    findByCMS()     : Object | boolean
    saveToState()   : Object;
    saveToCMS()     : Object;
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

    saveToState() : Object {
        return {}
    }

    saveToCMS() : Object {
        return {}
    }

}

// 正規化
// const contents = getContents.value?.items;
// const parseContents = contents.map(item => item.fields);