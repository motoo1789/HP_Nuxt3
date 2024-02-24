
export class Abstract {

    private readonly _abstract : string;
    
    constructor(abstract : string) {
        this._abstract = abstract
    }

    get abstract() : string {
        return this._abstract
    }
}