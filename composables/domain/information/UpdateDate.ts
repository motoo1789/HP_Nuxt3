export class UpdateDate {
    
    private readonly _date : string;
    
    constructor(date : string) {
        this._date = date
    }

    get updateDate() : string {
        return this._date
    }
}