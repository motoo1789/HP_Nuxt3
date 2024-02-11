import { SyllabaryNormalization } from "./SyllabaryNormalization"
import { AnimeFactory } from "./AnimeFactory"
import { BaseFactory } from "./BaseFactory"
import { Anime } from "./anime"

export interface BaseRepository {
    findByState() : Object | undefined
    findByCMS() : Object | boolean
    saveToState(cmsContents : Array<Object>) : Object;
    saveToCMS() : Object;
}


export class AnimeRepository implements BaseRepository {
    
    private animeRepository : SyllabaryNormalization | undefined;

    constructor() {
        console.log("AnimeRepository");
        this.animeRepository = undefined;
    }

    async findByState() : Promise<SyllabaryNormalization> {
        if(this.animeRepository === undefined) {
            return undefined;
        }
        return this.animeRepository;
    }

    async findByCMS() : Promise<data> {
		console.log("findByCMS");
		const { data : response } = await useFetch("/api/hobby/anime/GetAnimeContents")
		if(response === undefined) {
			return undefined;
		}
		return response;
    }

    saveToState(cmsContents : Array<Object>) : Object {
        console.log("saveToState");
        try {
            const animeEntryFactory : BaseFactory = new AnimeFactory();
            this.animeRepository = animeEntryFactory.createEntity(cmsContents);
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
