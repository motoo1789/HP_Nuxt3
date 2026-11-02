import { AnimeRepository, type BaseRepository } from "../../domain/hobby/anime/AnimeRepository"
import type { SyllabaryNormalization } from "../../domain/hobby/anime/SyllabaryNormalization"
import { emptyAnimeView, type ViewAnimeContents } from "./emptyAnimeView"

interface POSTFormat {
    syllabary : string,
    title : string[]
}

const animerepository: BaseRepository = new AnimeRepository();

export const animeContents = () => {
    const getAnimeContents = async (): Promise<ViewAnimeContents> => {
		try {
			const stateContents = await animerepository.findByState();
			if (stateContents) {
				return await normalizeViewContents(stateContents);
			}

			const response = await animerepository.findByCMS();
			if (!response) {
				console.warn("[anime] CMS response empty");
				return emptyAnimeView();
			}

			if (Array.isArray(response)) {
				animerepository.saveToState(response);
			}
			const viewanime = await animerepository.findByState();
			if (!viewanime) {
				return emptyAnimeView();
			}
			return await normalizeViewContents(viewanime);
		} catch (err) {
			console.error("[anime] getAnimeContents failed", err);
			return emptyAnimeView();
		}
	}

	const postAnimeEntity = async (formAnimeEntity : POSTFormat) => {
		return await animerepository.saveToCMS(formAnimeEntity);
	}

	return {
		getAnimeContents,
		postAnimeEntity
	}
};

async function normalizeViewContents(beforeViewAnimeContents : SyllabaryNormalization) : Promise<ViewAnimeContents> {

	const viewAnimeContents = emptyAnimeView();

	if (!beforeViewAnimeContents) {
		return viewAnimeContents;
	}

	Object.keys(viewAnimeContents).forEach((key) => {
		if (!(key in beforeViewAnimeContents)) {
			return;
		}
		const list = beforeViewAnimeContents[key as keyof SyllabaryNormalization];
		if (!list) {
			return;
		}
		list.forEach((anime) => {
			viewAnimeContents[key as keyof ViewAnimeContents].push(anime.title.title);
		});
	});
	
	return viewAnimeContents;
}
