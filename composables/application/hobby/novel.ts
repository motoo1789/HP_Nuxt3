import { BaseRepository } from "../../domain/hobby/novel/NovelRepository"
import { Novel } from "../../domain/hobby/novel/novel"

const repository: BaseRepository = new NovelRepository();

export const getNovelContents = () => {
    const novelContents = async () => {
		try {

			// repositoryにコンテンツがあるかの確認
			// あったら取得して早期リターン
			const stateContents = await repository.findByState();
			if(stateContents){
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
				const viewcontents : Array<Novel> = await repository.findByState();
				const normalizedViewContents =  await normalizeViewContents(viewcontents);
				
			return normalizedViewContents;
                
			} catch(err){
				console.log("Novel Contents error");
				console.log(err)
			}

		} catch (err) {
			await navigateTo('/error')
		}
	}

	return {
		novelContents
	}
};

async function normalizeViewContents(beforeViewContents : Array<Novel>) : Promise<Array<string>> {

	const viewAnimeContents : Array<string> = []
    beforeViewContents.forEach( content => {
        viewAnimeContents.push(content.title.title);
    })
	
	return viewAnimeContents;
}