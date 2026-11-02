import { Project } from "./Project"
import { ProjectFactory } from "./ProjectFactory"

export interface BaseRepository {
    findByState() : Promise<Array<Project>>
    findByCMS() :  Promise<data> | undefined
    saveToState(cmsContents : Array<Object>) : Object;
    saveToCMS() : Object;
}

export class ProjectRepository implements BaseRepository {
    
    private repository : Array<Project> | undefined;

    constructor() {

        this.repository = undefined;
    }

    async findByState() : Promise<Array<Project>>  {

        if(this.repository === undefined) {
            return undefined;
        }

        return this.repository;
    }

    async findByCMS() {
        try {
            return await $fetch("/api/project/GetProjectContents");
        } catch {
            return undefined;
        }
    }

    saveToState(cmsContents : Array<Object>) : Object {

        try {
            const projectEntryFactory : ProjectFactory = new ProjectFactory();
            this.repository = projectEntryFactory.create(cmsContents);
        } catch(err){
            console.log("saveToState error");
            console.log(err)
        }
        
        return {}
    }

    saveToCMS() : Object {
        return {}
    }

}