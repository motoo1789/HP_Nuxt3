import type { ContentfulEntryCollection } from "~/types/contentful-cms";
import type { SyllabaryNormalization } from "./SyllabaryNormalization";

export abstract class BaseFactory {
  createEntity(cmsContents: ContentfulEntryCollection[]): SyllabaryNormalization {
    return this.create(cmsContents);
  }

  abstract create(cmsContents: ContentfulEntryCollection[]): SyllabaryNormalization;
}