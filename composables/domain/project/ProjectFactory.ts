import type { ContentfulEntryCollection } from "~/types/contentful-cms";
import { contentfulAssetFile, contentfulFieldString } from "~/utils/contentfulFields";
import { Project } from "./Project";
import { EntryId } from "../field/EntryId";
import { Title } from "../field/Title";
import { Language } from "./Language";
import { Framework } from "./Framework";
import { Library } from "./Library";
import { Detail } from "./Detail";
import { Github } from "./Github";
import { Img } from "./Img";
import { Movie } from "./Movie";
import { ProjectDate } from "./ProjectDate";
import { Abstract } from "./Abstract";

export class ProjectFactory {
  create(cmsContents: ContentfulEntryCollection): Array<Project> {
    const createdProjectArray: Array<Project> = [];

    cmsContents.items.forEach((notNormalizeContent) => {
      const img = contentfulAssetFile(notNormalizeContent.fields, "img");
      const movie = contentfulAssetFile(notNormalizeContent.fields, "movie");
      const normalizeContent = new Project(
        new EntryId(notNormalizeContent.sys.id),
        new Title(contentfulFieldString(notNormalizeContent.fields, "title")),
        new Abstract(contentfulFieldString(notNormalizeContent.fields, "abstract")),
        new Language(contentfulFieldString(notNormalizeContent.fields, "language")),
        new Framework(contentfulFieldString(notNormalizeContent.fields, "framework")),
        new Library(contentfulFieldString(notNormalizeContent.fields, "library")),
        new Detail(contentfulFieldString(notNormalizeContent.fields, "detail")),
        new Github(contentfulFieldString(notNormalizeContent.fields, "github")),
        new Img(
          notNormalizeContent.sys.title ?? "",
          img.url,
          img.fileName,
        ),
        new Movie(
          notNormalizeContent.sys.title ?? "",
          movie.url,
          movie.fileName,
        ),
        new ProjectDate(""),
      );
      createdProjectArray.push(normalizeContent);
    });

    return createdProjectArray;
  }
}
