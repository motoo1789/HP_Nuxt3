import { Project } from "./Project"
import { EntryId } from "../field/EntryId"
import { Title } from "../field/Title"
import { Language } from "./Language"
import { Framework } from "./Framework"
import { Library } from "./Library"
import { Detail } from "./Detail"
import { Github } from "./Github"
import { Img } from "./Img"
import { Movie } from "./Movie"
import { ProjectDate } from "./ProjectDate"

export class ProjectFactory {

    constructor() {
        console.log("created ComicFactory instance");
    }

    create(cmsContents : Array<Object>) : Array<Project> {

        const createdComicArray = new Array<Project>;

        cmsContents.items.forEach( notNormalizeContent => {
            const normalizeContent : Project = new Project(
                new EntryId(notNormalizeContent.sys.id), // kari
                new Title(notNormalizeContent.sys.id), // kari
                new Abstract(notNormalizeContent.sys.abstract),
                new Language(notNormalizeContent.sys.language),
                new Framework(notNormalizeContent.sys.framework),
                new Library(notNormalizeContent.sys.library),
                new Detail(notNormalizeContent.sys.detail),
                new Github(notNormalizeContent.sys.github),
                new Img(notNormalizeContent.sys.id,notNormalizeContent.sys.id,notNormalizeContent.sys.id), // かり
                new Movie(notNormalizeContent.sys.id,notNormalizeContent.sys.id,notNormalizeContent.sys.id), // かり
                new ProjectDate(notNormalizeContent.sys.createdDate)
            )
            createdComicArray.push(normalizeContent);
        });

        return createdComicArray
    }
}