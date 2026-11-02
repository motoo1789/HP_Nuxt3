
import { NovelFactory } from "./NovelFactory"
// import { BaseFactory } from "./BaseFactory" どこに置くか・使うか検討中
import { Novel } from "./novel"

export interface BaseRepository {
    findByState() : Promise<Array<Novel>>
    findByCMS() :  Promise<data> | undefined
    saveToState(cmsContents : Array<Object>) : Object;
    saveToCMS() : Object;
}

export class NovelRepository implements BaseRepository {
    
    private repository : Array<Novel> | undefined;

    constructor() {
        this.repository = undefined;
    }

    async findByState() : Promise<Array<Novel>>  {
        if(this.repository === undefined) {
            return undefined;
        }

        return this.repository;
    }

    async findByCMS() {
        try {
            return await $fetch("/api/hobby/novel/GetNovelContents");
        } catch {
            return undefined;
        }
    }

    saveToState(cmsContents : Array<Object>) : Object {
        try {
            const comicEntryFactory : NovelFactory = new NovelFactory();
            this.repository = comicEntryFactory.create(cmsContents);
        } catch(err){
            console.log("saveToState error");
            console.log(err)
        }
        
        return {}
    }

    saveToCMS() : Object {
        return {}
    }

}
