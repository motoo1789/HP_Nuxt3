import { Project } from "../../domain/project/Project"
import { ProjectRepository, type BaseRepository } from "../../domain/project/ProjectRepository"

const repository: BaseRepository = new ProjectRepository();

export const getProjectContents = () => {
    const projectContents = async (): Promise<Array<ViewProjectFormat>> => {
		try {
			const stateContents = await repository.findByState();
			if (stateContents) {
				return await normalizeViewContents(stateContents);
			}

			const response = await repository.findByCMS();
			if (!response) {
				console.warn("[project] CMS response empty");
				return [];
			}

			await repository.saveToState(response);
			const viewcontents = await repository.findByState();
			if (!viewcontents) {
				return [];
			}
			return await normalizeViewContents(viewcontents);
		} catch (err) {
			console.error("[project] projectContents failed", err);
			return [];
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
	if (!beforeViewContents?.length) {
		return [];
	}

	const viewProjectContents : Array<ViewProjectFormat> = []
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
        viewProjectContents.push(joinContent);
    })
	
	return viewProjectContents;
}
