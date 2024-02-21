
export class Library {

    private readonly _library : string;
    
    constructor(library : string) {
        this._library = library
    }

    get library() : string {
        return this._library
    }
}