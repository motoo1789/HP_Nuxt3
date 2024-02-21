
export class Detail {

    private readonly _detail : string;

    constructor(detail : string) {
        this._detail = detail
    }

    get detail() : string {
        return this._detail
    }
}