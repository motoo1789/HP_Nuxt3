// import { BaseFactory } from "./BaseFactory"
import { Novel } from "./novel"
import { EntryId } from "../../field/EntryId"
import { Title } from "../../field/Title"

export class NovelFactory {

    constructor() {
    }

    create(cmsContents : Array<Object>) : Array<Novel> {

        const createdNovelArray = new Array<Novel>;

        cmsContents.items.forEach( notNormalizeContent => {
            const normalizeContent : Novel = new Novel(
                new EntryId(notNormalizeContent.sys.id),
                new Title(notNormalizeContent.fields.title)
            )
            createdNovelArray.push(normalizeContent);
        });

        return createdNovelArray
    }
}