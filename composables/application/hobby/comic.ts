import { BaseRepository } from "../../domain/hobby/comic/ComicRepository"
import { Comic } from "../../domain/hobby/comic/Comic"

const repository: BaseRepository = new ComicRepository();

export const getComicContents = () => {
    const comicContents = async () => {
		try {

			// repositoryにコンテンツがあるかの確認
			// あったら取得して早期リターン
			const stateContents = await repository.findByState();
			if(stateContents){
				console.log("Stateからコンテンツ取得")
				return await normalizeViewContents(stateContents);
			}

			// なかったら取得　デプロイ後の最初のアクセス
			try {
				const response = await repository.findByCMS();
				if (response === undefined) {
					console.log("Not contens ...");
				}
				/**
				 *  domain部分に正規化お願い
				*/
				await repository.saveToState(response.value!);
				const viewcontents : Array<Comic> = await repository.findByState();
				const normalizedViewContents =  await normalizeViewContents(viewcontents);
				
				return normalizedViewContents;
                
			} catch(err){
				console.log("Comic Contents error");
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

async function normalizeViewContents(beforeViewContents : Array<Comic>) : Promise<Array<string>> {

	const viewAnimeContents : Array<string> = []
    beforeViewContents.forEach( content => {
        viewAnimeContents.push(content.title.title);
    })
	
	return viewAnimeContents;
}