import { ComicRepository, type BaseRepository } from "../../domain/hobby/comic/ComicRepository"
import { Comic } from "../../domain/hobby/comic/comic"

const repository: BaseRepository = new ComicRepository();

export const getComicContents = () => {
    const comicContents = async (): Promise<Array<string>> => {
		try {
			const stateContents = await repository.findByState();
			if (stateContents) {
				return await normalizeViewContents(stateContents);
			}

			const response = await repository.findByCMS();
			if (!response) {
				console.warn("[comic] CMS response empty");
				return [];
			}

			await repository.saveToState(response);
			const viewcontents = await repository.findByState();
			if (!viewcontents) {
				return [];
			}
			return await normalizeViewContents(viewcontents);
		} catch (err) {
			console.error("[comic] comicContents failed", err);
			return [];
		}
	}

	return {
		comicContents
	}
};

async function normalizeViewContents(beforeViewContents : Array<Comic>) : Promise<Array<string>> {
	if (!beforeViewContents?.length) {
		return [];
	}

	const viewComicContents : Array<string> = []
    beforeViewContents.forEach( content => {
        viewComicContents.push(content.title.title);
    })
	
	return viewComicContents;
}
