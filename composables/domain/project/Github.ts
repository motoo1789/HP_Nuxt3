
export class Github {

    private readonly _github : string;

    constructor(github : string) {
        this._github = github
    }

    get github() : string {
        return this._github
    }
}