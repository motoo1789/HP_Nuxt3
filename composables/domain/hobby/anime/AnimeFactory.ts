import type { ContentfulEntryCollection } from "~/types/contentful-cms";
import { contentfulFieldString } from "~/utils/contentfulFields";
import { BaseFactory } from "./BaseFactory";
import { Anime } from "./anime";
import { EntryId } from "./EntryId";
import { Title } from "./Title";
import { SyllabaryNormalization } from "./SyllabaryNormalization";

export class AnimeFactory extends BaseFactory {
  create(cmsContents: ContentfulEntryCollection[]): SyllabaryNormalization {
    const createdAnimeArray: Array<Array<Anime>> = [];

    cmsContents.forEach((animeContentObject) => {
      const syllabaryArray: Array<Anime> = [];
      animeContentObject.items.forEach((notNormalizeAnimeContent) => {
        const normalizeAnimeContent = new Anime(
          new EntryId(notNormalizeAnimeContent.sys.id),
          new Title(contentfulFieldString(notNormalizeAnimeContent.fields, "title")),
        );
        syllabaryArray.push(normalizeAnimeContent);
      });
      createdAnimeArray.push(syllabaryArray);
    });

    return this.makeSyllabaryNormalization(createdAnimeArray);
  }

  private makeSyllabaryNormalization(createdAnimeArray: Array<Array<Anime>>): SyllabaryNormalization {
    const normalizedAnimeContents: SyllabaryNormalization = {
      animeA: [],
      animeKa: [],
      animeSa: [],
      animeTa: [],
      animeNa: [],
      animeHa: [],
      animeMa: [],
      animeYa: [],
      animeRa: [],
      animeWa: [],
    };

    if (Object.keys(normalizedAnimeContents).length !== createdAnimeArray.length) {
      return normalizedAnimeContents;
    }

    Object.keys(normalizedAnimeContents).forEach((key, index) => {
      if (
        key === "animeA" ||
        key === "animeKa" ||
        key === "animeSa" ||
        key === "animeTa" ||
        key === "animeNa" ||
        key === "animeHa" ||
        key === "animeMa" ||
        key === "animeYa" ||
        key === "animeRa" ||
        key === "animeWa"
      ) {
        normalizedAnimeContents[key as keyof SyllabaryNormalization] = createdAnimeArray[index];
      }
    });

    return normalizedAnimeContents;
  }
}
