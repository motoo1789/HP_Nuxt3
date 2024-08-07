import { BaseRepository } from "../../domain/hobby/anime/AnimeRepository"
import { SyllabaryNormalization } from "../../domain/hobby/anime/SyllabaryNormalization"

interface POSTFormat {
    syllabary : string,
    title : string[]
}

const animerepository: BaseRepository = new AnimeRepository();

export const animeContents = () => {
    const getAnimeContents = async () => {
		try {
			// repositoryにコンテンツがあるかの確認
			// あったら取得して早期リターン
			const stateContents = await animerepository.findByState();
			if(stateContents){

				return await normalizeViewContents(stateContents);
			}

			// なかったら取得　デプロイ後の最初のアクセス
			try {
				
				const response = await animerepository.findByCMS();
				if (response === undefined) {
					console.log("Not contens ...");
				}
				/**
				 *  domain部分に正規化
				*/
				await animerepository.saveToState(response.value!);
				const viewanime = await animerepository.findByState();
				const normalizedViewContents =  await normalizeViewContents(viewanime);
				return normalizedViewContents;
			} catch(err){
				console.log("animeContents error");
				console.log(err)
			}
		} catch (err) {
			await navigateTo('/error')
		}
	}

	const postAnimeEntity = async (formAnimeEntity : POSTFormat) => {
		return await animerepository.saveToCMS(formAnimeEntity);
	}

	return {
		getAnimeContents,
		postAnimeEntity
	}
};

interface ViewAnimeContents {
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

async function normalizeViewContents(beforeViewAnimeContents : SyllabaryNormalization) : Promise<ViewAnimeContents> {

	const viewAnimeContents : ViewAnimeContents= {
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

	Object.keys(beforeViewAnimeContents).forEach((key, index) => {
		if(	key === "animeA" 	|| key === "animeKa" || key === "animeSa" || key === "animeTa" || key === "animeNa" ||
			key === "animeHa" 	|| key === "animeMa" || key === "animeYa" || key === "animeRa" || key === "animeWa")
		{
			if(beforeViewAnimeContents[key] === undefined) {
				console.log("undefined");
				return;
			}
			beforeViewAnimeContents[key].forEach(anime => {
				viewAnimeContents[key].push(anime.title.title)
			});
		}
	});
	
	return viewAnimeContents;
}