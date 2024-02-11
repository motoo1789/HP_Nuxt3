//import { BaseRepository } from "../../domain/hobby/comic/ComicRepository"
import { ComicFactory } from "../../domain/hobby/comic/ComicFactory"

// const animerepository: BaseRepository = new AnimeRepository();

export const getComicContents = () => {
    const comicContents = async () => {
		try {
            const { data : response } = await useFetch("/api/hobby/comic/GetComicContents")

            const comicEntryFactory : ComicFactory = new ComicFactory();
            const test = comicEntryFactory.create(response.value!);
            console.log(test)
            return test;
			// repositoryにコンテンツがあるかの確認
			// あったら取得して早期リターン
			// const stateContents = await animerepository.findByState();
			// if(stateContents){
			// 	console.log("Stateからコンテンツ取得")
			// 	return await normalizeViewContents(stateContents);
			// }

			// なかったら取得　デプロイ後の最初のアクセス
			try {
				
				// const response = await animerepository.findByCMS();
				// if (response === undefined) {
				// 	console.log("Not contens ...");
				// }
				// /**
				//  *  domain部分に正規化お願い
				// */
				// //await animerepository.saveToState(response.value!);
				// await animerepository.saveToState(response.value!);
				// const viewanime = await animerepository.findByState();
				// const aaa =  await normalizeViewContents(viewanime);
				// console.log(aaa);
				// return aaa;
			} catch(err){
				console.log("animeContents error");
				console.log(err)
			}
			

			

		} catch (err) {
			await navigateTo('/error')
		}
	}

	return {
		comicContents
	}
};

interface ViewAnimeContents {
	comic : Array<string>
} 

async function normalizeViewContents(beforeViewAnimeContents : SyllabaryNormalization) : Promise<ViewAnimeContents> {

	const viewAnimeContents : ViewAnimeContents= {
        comic : []
	}

	Object.keys(beforeViewAnimeContents).forEach((key, index) => {
		if(beforeViewAnimeContents[key] === undefined) {
			console.log("undefinedだよ");
			return;
		}
		beforeViewAnimeContents[key].forEach(anime => {
			if(	key === "animeA" 	|| key === "animeKa" || key === "animeSa" || key === "animeTa" || key === "animeNa" ||
				key === "animeHa" 	|| key === "animeMa" || key === "animeYa" || key === "animeRa" || key === "animeWa")
			{
				viewAnimeContents[key].push(anime.title.title)
			}
		});
	});
	
	return viewAnimeContents;
}