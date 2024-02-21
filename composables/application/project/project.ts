import { Project } from "~~/.nuxt/imports";
import { BaseRepository } from "../../domain/project/ProjectRepository"


const repository: BaseRepository = new ProjectRepository();

export const getProjectContents = () => {
    const projectContents = async () => {
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
				const viewcontents : Array<Project> = await repository.findByState();
				const normalizedViewContents =  await normalizeViewContents(viewcontents);
			
				return normalizedViewContents;
                
			} catch(err){
				console.log("Projecgt Contents error");
				console.log(err)
			}

		} catch (err) {
			await navigateTo('/error')
		}
	}

	return {
		projectContents
	}
};

interface ViewProjectFormat {
	url: String,
	detail: String,
	abstract: String,
	environments: {
		language: String,
		framework: String,
		library: String,
	},
	img: String,
	title: String,
	movie: String,
}

async function normalizeViewContents(beforeViewContents : Array<Project>) : Promise<Array<ViewProjectFormat>> {

	const viewAnimeContents : Array<ViewProjectFormat> = []
    beforeViewContents.forEach( (content, index) => {
		const joinContent = {
			projectNum: index,
			title: content.title.title,
			abstract: content.abstract.abstract,
			environments: {
				language: content.language.language,
				framework: content.framework.framework,
				library: content.library.library,
			},

			detail: content.detail.detail,
			url: content.github.github,
			img: content.img.url,
			movie: content.movie.url,
		}
        viewAnimeContents.push(joinContent);
    })
	
	return viewAnimeContents;
}