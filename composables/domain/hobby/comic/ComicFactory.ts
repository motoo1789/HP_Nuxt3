import type { ContentfulEntryCollection } from "~/types/contentful-cms";
import { contentfulFieldString } from "~/utils/contentfulFields";
import { Comic } from "./comic";
import { EntryId } from "../../field/EntryId";
import { Title } from "../../field/Title";

export class ComicFactory {
  create(cmsContents: ContentfulEntryCollection): Array<Comic> {
    const createdComicArray: Array<Comic> = [];

    cmsContents.items.forEach((notNormalizeContent) => {
      const normalizeContent = new Comic(
        new EntryId(notNormalizeContent.sys.id),
        new Title(contentfulFieldString(notNormalizeContent.fields, "title")),
      );
      createdComicArray.push(normalizeContent);
    });

    return createdComicArray;
  }
}
