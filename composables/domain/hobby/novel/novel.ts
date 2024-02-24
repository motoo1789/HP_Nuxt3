import { EntryId } from "../../field/EntryId"
import { Title } from "../../field/Title"

export class Novel {
    readonly id: EntryId;
    title: Title;

    constructor(id: EntryId, title: Title) {
        this.id     = id;
        this.title  = title
    }
}
