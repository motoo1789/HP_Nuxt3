export class ShortContent {
    
    private readonly _constent : string;
    
    constructor(abstract : string) {
        this._constent = abstract
    }

    get abstract() : string {
        return this._constent
    }
}