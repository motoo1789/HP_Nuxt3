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
        console.log("ComicRepository");
        this.repository = undefined;
    }

    async findByState() : Promise<Array<Project>>  {
        console.log("findByState");
        if(this.repository === undefined) {
            return undefined;
        }

        return this.repository;
    }

    async findByCMS() : Promise<data> {
		console.log("ComicRepository findByCMS");
        try {
            const { data : response } = await useFetch("/api/project/GetProjectContents")
            if(response === undefined) {
                return undefined;
            }
            return response;
        } catch(err) {

        }
    }

    saveToState(cmsContents : Array<Object>) : Object {
        console.log("ComicRepository saveToState");
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