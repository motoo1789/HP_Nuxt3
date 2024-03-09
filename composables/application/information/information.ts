import { Project } from "~~/.nuxt/imports";
import { InformationRepository } from "../../domain/information/InformationRepository"


const repository: InformationRepository = new InformationRepository();

interface POSTFormat {
    abstract : string,
    detaile : string,
    createdInformationDate : string
}

export const informationContents = () => {
    const getInformationContents = async () => {
		try {
			// repositoryにコンテンツがあるかの確認
			// あったら取得して早期リターン


			// なかったら取得　デプロイ後の最初のアクセス
			try {
				

				/**
				 *  domain部分に正規化お願い
				*/

				return undefined;
			} catch(err){
				console.log("information Contents error");
				console.log(err)
			}
		} catch (err) {
			await navigateTo('/error')
		}
	}

	const postInformationEntity = async (formAnimeEntity : POSTFormat) => {
		return await repository.saveToCMS(formAnimeEntity);
	}

	return {
		getInformationContents,
		postInformationEntity
	}
};