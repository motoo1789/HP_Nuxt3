


export class Project {
    readonly id: EntryId;
    title: Title;
    abstract: Abstract;
    language: Language;
    framework: Framework;
    library: Library;
    detail: Detail;
    github: Github;
    img: Img;
    movie: Movie;
    createdDate: ProjectDate;

    constructor(id: EntryId, title: Title, abstract: Abstract, language: Language, framework: Framework, 
                library: Library, detail: Detail, github: Github, img: Img, movie: Movie, createDate: ProjectDate) {
        this.id     = id;
        this.title  = title
        this.abstract = abstract,
        this.language = language,
        this.framework = framework,
        this.library = library,
        this.detail = detail,
        this.github = github,
        this.img = img,
        this.movie = movie,
        this.createdDate = createDate
    }
}
