import { EntryId } from "./EntryId"
import { Title } from "./Title"

export class Anime {
    readonly id: EntryId;
    title: Title;

    constructor(id: EntryId, title: Title) {
        this.id     = id;
        this.title  = title
    }
}
