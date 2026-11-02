import type { ContentfulEntryCollection } from "~/types/contentful-cms";
import { NovelFactory } from "./NovelFactory";
import { Novel } from "./novel";

export interface BaseRepository {
  findByState(): Promise<Array<Novel> | undefined>;
  findByCMS(): Promise<ContentfulEntryCollection | undefined>;
  saveToState(cmsContents: ContentfulEntryCollection): void;
  saveToCMS(): Record<string, never>;
}

export class NovelRepository implements BaseRepository {
  private repository: Array<Novel> | undefined;

  constructor() {
    this.repository = undefined;
  }

  async findByState(): Promise<Array<Novel> | undefined> {
    return this.repository;
  }

  async findByCMS(): Promise<ContentfulEntryCollection | undefined> {
    try {
      return await $fetch<ContentfulEntryCollection>("/api/hobby/novel/GetNovelContents");
    } catch {
      return undefined;
    }
  }

  saveToState(cmsContents: ContentfulEntryCollection): void {
    try {
      const novelEntryFactory = new NovelFactory();
      this.repository = novelEntryFactory.create(cmsContents);
    } catch (err) {
      console.log("saveToState error");
      console.log(err);
    }
  }

  saveToCMS(): Record<string, never> {
    return {};
  }
}
