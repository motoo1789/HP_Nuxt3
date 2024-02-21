
export class Framework {

    private readonly _framework : string;

    constructor(framework : string) {
        this._framework = framework
    }

    get framework() : string {
        return this._framework
    }
}