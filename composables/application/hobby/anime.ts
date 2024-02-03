import { BaseRepository } from "../../domain/hobby/anime/AnimeRepository"

const animerepository: BaseRepository = new AnimeRepository();

export const getAnimeContents = () => {
    const animeContents = async () => {
		try {
			// repositoryにコンテンツがあるかの確認
			// あったら取得して早期リターン
			const stateContents = animerepository.findByState();
			if(stateContents){
				console.log("Stateからコンテンツ取得")
				return {}
			}

			// なかったら取得　デプロイ後の最初のアクセス
			// const { data:response } = await useFetch("/api/hobby/anime/GetAnimeContents")

			// if (response === null) {
			// 	console.log("Not contens ...");
			// }

			/**
			 *  domain部分にお願い
			*/

			return animerepository.findByCMS()

		} catch (err) {
			await navigateTo('/error')
		}
	}

	return {
		animeContents
	}
};
