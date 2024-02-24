import { SyllabaryNormalization } from "./SyllabaryNormalization"

export abstract class BaseFactory {

    constructor() {
    }

    createEntity(cmsContents : Array<Object>) : SyllabaryNormalization {
        return this.create(cmsContents);
    }

    abstract create(cmsContents : Array<Object>) : SyllabaryNormalization;
}