
export class ProjectDate {

    private readonly _date : string;
    
    constructor(date : string) {
        this._date = date
    }

    get date() : string {
        return this._date
    }
}