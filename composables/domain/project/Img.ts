
export class Img {

    private readonly _title : string;
    private readonly _url : string;
    private readonly _fileName : string;


    constructor(title : string, url : string, fileName : string) {
        this._title = title;
        this._url = url;
        this._fileName = fileName;
    }

    get url() : string {
        return this._url
    }
}