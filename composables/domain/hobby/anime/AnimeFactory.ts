import { BaseFactory } from "./BaseFactory"

interface SyllabaryNormalization {
    "animeA"  : Array<string>, 
    "animeKa" : Array<string>,
    "animeSa" : Array<string>,
    "animeTa" : Array<string>,
    "animeNa" : Array<string>,
    "animeHa" : Array<string>,
    "animeMa" : Array<string>,
    "animeYa" : Array<string>,
    "animeRa" : Array<string>,
    "animeWa" : Array<string>
}

export class AnimeFactory extends BaseFactory {

    constructor() {
        super();
        console.log("created AnimeFactory instance");
    }

    create(cmsContents : Array<Object>): void {
        console.log("AnimeFactory create");
        console.log(cmsContents);
        const tmparray = new Array<Array<string>>;

        // // itemsからarrayを全て確保ｓる
        cmsContents.forEach( animeContentObject => {
            const animeContentsArray = animeContentObject.items;
            const tmp = animeContentsArray.map(animeItem => animeItem.fields); // [{title : "アニメ"},{title : "アニメ"}]
            tmparray.push(tmp.map(anime => anime.title));
            
        });
        console.log(tmparray);

        let obj : SyllabaryNormalization= {
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

        if(Object.keys(obj).length !== tmparray.length){
            // 長さが異なればreturnしていい
            //return {}
        }

        Object.keys(obj).forEach((key, index) => {
            if(key === "animeA" || key === "animeKa" || key === "animeSa" || key === "animeTa" || key === "animeNa" || key === "animeHa" || key === "animeMa" || key === "animeYa" || key === "animeRa" || key === "animeWa")
            {
                obj[key] = tmparray[index];
            }
        });

		console.log(obj);
    }
}