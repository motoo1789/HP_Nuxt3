
import { ComicFactory } from "./ComicFactory"
// import { BaseFactory } from "./BaseFactory" どこに置くか・使うか検討中
import { Comic } from "./comic"

export interface BaseRepository {
    findByState() : Promise<Array<Comic>>
    findByCMS() :  Promise<data> | undefined
    saveToState(cmsContents : Array<Object>) : Object;
    saveToCMS() : Object;
}

export class ComicRepository implements BaseRepository {
    
    private repository : Array<Comic> | undefined;

    constructor() {

        this.repository = undefined;
    }

    async findByState() : Promise<Array<Comic>>  {

        if(this.repository === undefined) {
            return undefined;
        }

        return this.repository;
    }

    async findByCMS() : Promise<data> {

        try {
            const { data : response } = await useFetch("/api/hobby/comic/GetComicContents")
            if(response === undefined) {
                return undefined;
            }
            return response;
        } catch(err) {

        }
    }

    saveToState(cmsContents : Array<Object>) : Object {

        try {
            const comicEntryFactory : ComicFactory = new ComicFactory();
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
