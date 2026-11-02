import type { ContentfulEntryCollection } from "~/types/contentful-cms";
import { SyllabaryNormalization } from "./SyllabaryNormalization";
import { AnimeFactory } from "./AnimeFactory";
import { BaseFactory } from "./BaseFactory";

export interface BaseRepository {
  findByState(): Promise<SyllabaryNormalization | undefined>;
  findByCMS(): Promise<ContentfulEntryCollection[] | undefined>;
  saveToState(cmsContents: ContentfulEntryCollection[]): void;
  saveToCMS(formAnimeEntity: POSTFormat): Promise<boolean>;
}

interface POSTFormat {
  syllabary: string;
  title: string[];
}

export class AnimeRepository implements BaseRepository {
  private animeRepository: SyllabaryNormalization | undefined;

  constructor() {
    this.animeRepository = undefined;
  }

  async findByState(): Promise<SyllabaryNormalization | undefined> {
    return this.animeRepository;
  }

  async findByCMS(): Promise<ContentfulEntryCollection[] | undefined> {
    try {
      return await $fetch<ContentfulEntryCollection[]>("/api/hobby/anime/GetAnimeContents");
    } catch {
      return undefined;
    }
  }

  saveToState(cmsContents: ContentfulEntryCollection[]): void {
    try {
      const animeEntryFactory: BaseFactory = new AnimeFactory();
      this.animeRepository = animeEntryFactory.createEntity(cmsContents);
    } catch (err) {
      console.log("saveToState error");
      console.log(err);
    }
  }

  async saveToCMS(formAnimeEntity: POSTFormat): Promise<boolean> {
    try {
      const result = await $fetch<string>("/api/hobby/anime/PostAnimeEntity", {
        method: "POST",
        body: formAnimeEntity,
        headers: {
          Accept: "application/json",
        },
      });
      return result === "success";
    } catch (err) {
      console.error("[anime] saveToCMS failed", err);
      return false;
    }
  }
}
