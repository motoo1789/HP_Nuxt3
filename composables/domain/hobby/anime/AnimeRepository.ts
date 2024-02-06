import { AnimeFactory } from "./AnimeFactory"
import { BaseFactory } from "./BaseFactory"

export interface BaseRepository {
    findByState() : Object | boolean
    findByCMS() : Object | boolean
    saveToState(cmsContents : Array<Object>) : Object;
    saveToCMS() : Object;
}


export class AnimeRepository implements BaseRepository {
    
    private map = new Map<string, Array<Anime>>();

    constructor() {
        console.log("AnimeRepository");
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
        try {
            const animeEntryFactory : BaseFactory = new AnimeFactory();
            console.log("saveToState animeEntryFactory");
            animeEntryFactory.createEntity(cmsContents);


        } catch(err){
            console.log("error error");
            console.log(err)
        }
        
        return {}
    }

    saveToCMS() : Object {
        return {}
    }

}
