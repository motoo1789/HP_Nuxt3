import { BaseFactory } from "./BaseFactory"
import { Anime } from "./anime"
import { EntryId } from "./EntryId"
import { Title } from "./Title"
import { SyllabaryNormalization } from "./SyllabaryNormalization"

export class AnimeFactory extends BaseFactory {

    constructor() {
        super();
    }

    create(cmsContents : Array<Object>) : SyllabaryNormalization {

        const createdAnimeArray = new Array<Array<Anime>>;

        // // itemsからarrayを全て確保
        cmsContents.forEach( animeContentObject => {

            const syllabaryArray = new Array<Anime>;
            animeContentObject.items.forEach( notNormalizeAnimeContent => {
                const normalizeAnimeContent : Anime = new Anime(
					new EntryId(notNormalizeAnimeContent.sys.id),
                    new Title(notNormalizeAnimeContent.fields.title)
				)
                syllabaryArray.push(normalizeAnimeContent);
            });
            createdAnimeArray.push(syllabaryArray);

        });

        return this.makeSyllabaryNormalization(createdAnimeArray)
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
            // 長さが異なれば初期化状態でreturnしてみる
            return normalizedAnimeContents
        }

        Object.keys(normalizedAnimeContents).forEach((key, index) => {
            if(	key === "animeA" 	|| key === "animeKa" || key === "animeSa" || key === "animeTa" || key === "animeNa" ||
                key === "animeHa" 	|| key === "animeMa" || key === "animeYa" || key === "animeRa" || key === "animeWa")
            {
                normalizedAnimeContents[key] = createdAnimeArray[index];
            }
        });

        return normalizedAnimeContents; 
    }
}