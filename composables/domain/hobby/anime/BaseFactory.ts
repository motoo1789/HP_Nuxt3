export abstract class BaseFactory {

    constructor() {
        console.log("BaseFactory");
    }

    createEntity(cmsContents : Array<Object>) : any{
        console.log("createEntity");
        this.create(cmsContents);
        // return new Anime(new EntryId(""), new Title(""));
    }

    abstract create(cmsContents : Array<Object>) : void;
}