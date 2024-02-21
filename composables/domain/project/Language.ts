
export class Language {

    private readonly _language : string;

    constructor(language : string) {
        this._language = language
    }

    get language() : string {
        return this._language
    }
}