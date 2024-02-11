import { SyllabaryNormalization } from "./SyllabaryNormalization"

export abstract class BaseFactory {

    constructor() {
        console.log("BaseFactory");
    }

    createEntity(cmsContents : Array<Object>) : SyllabaryNormalization {
        console.log("createEntity");
        return this.create(cmsContents);
    }

    abstract create(cmsContents : Array<Object>) : SyllabaryNormalization;
}