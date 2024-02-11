// import { BaseFactory } from "./BaseFactory"
import { Comic } from "./comic"
import { EntryId } from "../field/EntryId"
import { Title } from "../field//Title"

export class ComicFactory {

    constructor() {
        console.log("created ComicFactory instance");
    }

    create(cmsContents : Array<Object>) : Array<Comic> {

        const createdComicArray = new Array<Comic>;

        cmsContents.items.forEach( notNormalizeContent => {
            const normalizeContent : Comic = new Comic(
                new EntryId(notNormalizeContent.sys.id),
                new Title(notNormalizeContent.fields.title)
            )
            createdComicArray.push(normalizeContent);
        });

        return createdComicArray
    }
}