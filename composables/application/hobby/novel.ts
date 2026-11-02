import { NovelRepository, type BaseRepository } from "../../domain/hobby/novel/NovelRepository"
import { Novel } from "../../domain/hobby/novel/novel"

const repository: BaseRepository = new NovelRepository();

export const getNovelContents = () => {
    const novelContents = async (): Promise<Array<string>> => {
		try {
			const stateContents = await repository.findByState();
			if (stateContents) {
				return await normalizeViewContents(stateContents);
			}

			const response = await repository.findByCMS();
			if (!response) {
				console.warn("[novel] CMS response empty");
				return [];
			}

			await repository.saveToState(response);
			const viewcontents = await repository.findByState();
			if (!viewcontents) {
				return [];
			}
			return await normalizeViewContents(viewcontents);
		} catch (err) {
			console.error("[novel] novelContents failed", err);
			return [];
		}
	}

	return {
		novelContents
	}
};

async function normalizeViewContents(beforeViewContents : Array<Novel>) : Promise<Array<string>> {
	if (!beforeViewContents?.length) {
		return [];
	}

	const viewNovelContents : Array<string> = []
    beforeViewContents.forEach( content => {
        viewNovelContents.push(content.title.title);
    })
	
	return viewNovelContents;
}
