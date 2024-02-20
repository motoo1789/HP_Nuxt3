
export class Movie {

    private readonly title : string;
    private readonly url : string;
    private readonly fileName : string;

    constructor(title : string, url : string, fileName : string) {
        this.title = title;
        this.url = url;
        this.fileName = fileName;
    }
}