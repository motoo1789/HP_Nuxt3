import { Information } from "~~/.nuxt/imports";
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
            const stateContents = await repository.findByState();
            if(stateContents){
                // todo:正規化は必要かも　そもそも正規化はapulicationでやるべきことなのか？
				return stateContents;
			}

			// なかったら取得　デプロイ後の最初のアクセス
			try {
				const cmdContents = await repository.findByCMS();
				if (cmdContents === undefined) {
					console.log("Not contens ...");
				}

				/**
				 *  domain部分に正規化お願い
				*/
                await repository.saveToState(cmdContents.value!);
				const viewcontents : Array<Information> = await repository.findByState();
				const normalizedViewContents =  await normalizeViewContents(viewcontents);

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