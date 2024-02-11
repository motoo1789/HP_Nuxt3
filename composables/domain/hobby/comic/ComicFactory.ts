// import { BaseFactory } from "./BaseFactory"
import { Comic } from "./Comic"
import { EntryId } from "../field/EntryId"
import { Title } from "../field//Title"

export class ComicFactory {

    constructor() {
        console.log("created ComicFactory instance");
    }

    create(cmsContents : Array<Object>) : Object{

        const createdComicArray = new Array<Comic>;

        cmsContents.items.forEach( notNormalizeContent => {
            const normalizeContent : Comic = new Comic(
                new EntryId(notNormalizeContent.sys.id),
                new Title(notNormalizeContent.fields.title)
            )
            createdComicArray.push(normalizeContent);
        });

        return createdComicArray
    }

    // private makeSyllabaryNormalization(createdAnimeArray : Array<Array<Anime>>) : SyllabaryNormalization {
        
    //     const normalizedAnimeContents : SyllabaryNormalization= {
    //         animeA	: [],
    //         animeKa	: [],
    //         animeSa	: [],
    //         animeTa	: [],
    //         animeNa	: [],
    //         animeHa	: [],
    //         animeMa	: [],
    //         animeYa	: [],
    //         animeRa	: [],
    //         animeWa	: [],
    //     }

    //     if(Object.keys(normalizedAnimeContents).length !== createdAnimeArray.length){
    //         // 長さが異なれば初期化状態でreturnしてみる
    //         return normalizedAnimeContents
    //     }

    //     Object.keys(normalizedAnimeContents).forEach((key, index) => {
    //         if(	key === "animeA" 	|| key === "animeKa" || key === "animeSa" || key === "animeTa" || key === "animeNa" ||
    //             key === "animeHa" 	|| key === "animeMa" || key === "animeYa" || key === "animeRa" || key === "animeWa")
    //         {
    //             normalizedAnimeContents[key] = createdAnimeArray[index];
    //         }
    //     });

    //     return normalizedAnimeContents; 
    // }
}