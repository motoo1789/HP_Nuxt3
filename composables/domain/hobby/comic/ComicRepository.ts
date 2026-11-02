import type { ContentfulEntryCollection } from "~/types/contentful-cms";
import { ComicFactory } from "./ComicFactory";
import { Comic } from "./comic";

export interface BaseRepository {
  findByState(): Promise<Array<Comic> | undefined>;
  findByCMS(): Promise<ContentfulEntryCollection | undefined>;
  saveToState(cmsContents: ContentfulEntryCollection): void;
  saveToCMS(): Record<string, never>;
}

export class ComicRepository implements BaseRepository {
  private repository: Array<Comic> | undefined;

  constructor() {
    this.repository = undefined;
  }

  async findByState(): Promise<Array<Comic> | undefined> {
    return this.repository;
  }

  async findByCMS(): Promise<ContentfulEntryCollection | undefined> {
    try {
      return await $fetch<ContentfulEntryCollection>("/api/hobby/comic/GetComicContents");
    } catch {
      return undefined;
    }
  }

  saveToState(cmsContents: ContentfulEntryCollection): void {
    try {
      const comicEntryFactory = new ComicFactory();
      this.repository = comicEntryFactory.create(cmsContents);
    } catch (err) {
      console.log("saveToState error");
      console.log(err);
    }
  }

  saveToCMS(): Record<string, never> {
    return {};
  }
}
