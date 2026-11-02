import type { ContentfulEntryCollection } from "~/types/contentful-cms";
import { contentfulFieldString } from "~/utils/contentfulFields";
import { Novel } from "./novel";
import { EntryId } from "../../field/EntryId";
import { Title } from "../../field/Title";

export class NovelFactory {
  create(cmsContents: ContentfulEntryCollection): Array<Novel> {
    const createdNovelArray: Array<Novel> = [];

    cmsContents.items.forEach((notNormalizeContent) => {
      const normalizeContent = new Novel(
        new EntryId(notNormalizeContent.sys.id),
        new Title(contentfulFieldString(notNormalizeContent.fields, "title")),
      );
      createdNovelArray.push(normalizeContent);
    });

    return createdNovelArray;
  }
}
