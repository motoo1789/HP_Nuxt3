import type { ContentfulEntryCollection } from "~/types/contentful-cms";
import { Project } from "./Project";
import { ProjectFactory } from "./ProjectFactory";

export interface BaseRepository {
  findByState(): Promise<Array<Project> | undefined>;
  findByCMS(): Promise<ContentfulEntryCollection | undefined>;
  saveToState(cmsContents: ContentfulEntryCollection): void;
  saveToCMS(): Record<string, never>;
}

export class ProjectRepository implements BaseRepository {
  private repository: Array<Project> | undefined;

  constructor() {
    this.repository = undefined;
  }

  async findByState(): Promise<Array<Project> | undefined> {
    return this.repository;
  }

  async findByCMS(): Promise<ContentfulEntryCollection | undefined> {
    try {
      return await $fetch<ContentfulEntryCollection>("/api/project/GetProjectContents");
    } catch {
      return undefined;
    }
  }

  saveToState(cmsContents: ContentfulEntryCollection): void {
    try {
      const projectEntryFactory = new ProjectFactory();
      this.repository = projectEntryFactory.create(cmsContents);
    } catch (err) {
      console.log("saveToState error");
      console.log(err);
    }
  }

  saveToCMS(): Record<string, never> {
    return {};
  }
}
