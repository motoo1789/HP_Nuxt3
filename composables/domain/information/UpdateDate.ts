class UpdateDate {
    
    private readonly _date : string;
    
    constructor(abstract : string) {
        this._date = abstract
    }

    get abstract() : string {
        return this._date
    }
}