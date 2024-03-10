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
            if(stateContents !== undefined){
                // todo:正規化は必要かも　そもそも正規化はapulicationでやるべきことなのか？
				return normalizeViewContents(stateContents.slice());
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
				const normalizedViewContents = await normalizeViewContents(viewcontents.slice());
				
				return normalizedViewContents;

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


async function normalizeViewContents(beforeViewContents : Array<Information>) : Promise<Array<Object>> {

	const showMaxInformation = 5;
	const returnPageArray = []
	const contentLength : number = beforeViewContents.length
	const endPage : number = Math.ceil(contentLength / showMaxInformation);

	for(let counterPage = 1; counterPage <= endPage; counterPage++)
	{
		const onePageInformation = [];
		const showPageContents : number = counterPage === endPage ? (contentLength % showMaxInformation) : showMaxInformation;

		for(let counter = 0; counter < showPageContents; counter++) 
		{
			const informationEntity : object | undefined = beforeViewContents.pop()?.view();
			onePageInformation.push(informationEntity);
		}

		const pageCounterInformationContent = {
			page: counterPage,
			contents: onePageInformation,
		}
		returnPageArray.push(pageCounterInformationContent)	
	}
	return returnPageArray
}