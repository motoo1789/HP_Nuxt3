import { BaseFactory } from "./BaseFactory"
// import { Anime } from "./anime"
import { EntryId } from "./EntryId"
import { Title } from "./Title"


interface Anime {
    title: string,
    entryId: string,
}

interface SyllabaryNormalization {
    "animeA"  : Array<Anime>, 
    "animeKa" : Array<Anime>,
    "animeSa" : Array<Anime>,
    "animeTa" : Array<Anime>,
    "animeNa" : Array<Anime>,
    "animeHa" : Array<Anime>,
    "animeMa" : Array<Anime>,
    "animeYa" : Array<Anime>,
    "animeRa" : Array<Anime>,
    "animeWa" : Array<Anime>
}

export class AnimeFactory extends BaseFactory {

    constructor() {
        super();
        console.log("created AnimeFactory instance");
    }

    create(cmsContents : Array<Object>): void {
        console.log("AnimeFactory create");
        console.log(cmsContents);
        const createdAnimeArray = new Array<Array<Anime>>;

        // // itemsからarrayを全て確保
        cmsContents.forEach( animeContentObject => {

            const syllabaryArray = new Array<Anime>;
            animeContentObject.items.forEach( notNormalizeAnimeContent => {
                const normalizeAnimeContent : Anime = {
                    title: notNormalizeAnimeContent.fields.title,
                    entryId: notNormalizeAnimeContent.sys.id,
                }
                syllabaryArray.push(normalizeAnimeContent);
            });
            createdAnimeArray.push(syllabaryArray);

        });

        console.log(createdAnimeArray);

        this.makeSyllabaryNormalization(createdAnimeArray)
        //return this.make(createdAnimeArray)
    }

    private makeSyllabaryNormalization(createdAnimeArray : Array<Array<Anime>>) : SyllabaryNormalization {
        
        const normalizedAnimeContents : SyllabaryNormalization= {
            animeA	: [],
            animeKa	: [],
            animeSa	: [],
            animeTa	: [],
            animeNa	: [],
            animeHa	: [],
            animeMa	: [],
            animeYa	: [],
            animeRa	: [],
            animeWa	: [],
        }

        if(Object.keys(normalizedAnimeContents).length !== createdAnimeArray.length){
            // 長さが異なればreturnしていい
            //return {}
        }

        Object.keys(normalizedAnimeContents).forEach((key, index) => {
            if(	key === "animeA" 	|| key === "animeKa" || key === "animeSa" || key === "animeTa" || key === "animeNa" ||
                key === "animeHa" 	|| key === "animeMa" || key === "animeYa" || key === "animeRa" || key === "animeWa")
            {
                normalizedAnimeContents[key] = createdAnimeArray[index];
            }
        });
        
        console.log(normalizedAnimeContents);

        return normalizedAnimeContents; 
    }
}