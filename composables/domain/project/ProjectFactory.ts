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
import { Abstract } from "./Abstract"

export class ProjectFactory {

    constructor() {
    }

    create(cmsContents : Array<Object>) : Array<Project> {

        const createdComicArray = new Array<Project>;

        cmsContents.items.forEach( notNormalizeContent => {
            const normalizeContent : Project = new Project(
                new EntryId(notNormalizeContent.sys.id), // kari
                new Title(notNormalizeContent.fields.title), // kari
                new Abstract(notNormalizeContent.fields.abstract),
                new Language(notNormalizeContent.fields.language),
                new Framework(notNormalizeContent.fields.framework),
                new Library(notNormalizeContent.fields.library),
                new Detail(notNormalizeContent.fields.detail),
                new Github(notNormalizeContent.fields.github),
                new Img(notNormalizeContent.sys.title,notNormalizeContent.fields.img.fields.file.url,notNormalizeContent.fields.img.fields.file.fileName), // かり
                new Movie(notNormalizeContent.sys.title,notNormalizeContent.fields.movie.fields.file.url,notNormalizeContent.fields.movie.fields.file.fileName), // かり
                new ProjectDate("") // contentfulに現状データはない
            )
            createdComicArray.push(normalizeContent);
        });

        return createdComicArray
    }
}