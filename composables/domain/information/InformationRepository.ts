import { InformationFactory } from "./InformationFactory"
import { Information } from "./Information"

export interface BaseRepository {
    findByState() : Promise<Array<Information>>
    findByCMS() :  Promise<data>
    saveToState(cmsContents : Array<POSTFormat>) : void;
    saveToCMS(information : POSTFormat) : Object;
}

interface POSTFormat {
    abstract : string,
    detaile : string,
    createdInformationDate : string
}

export class InformationRepository implements BaseRepository {
    
    private repository : Array<Information> | undefined;

    constructor() {
        this.repository = undefined;
    }

    async findByState() : Promise<Array<Information>>  {

        if(this.repository === undefined) {
            return undefined;
        }
        return this.repository;
    }

    async findByCMS() : Promise<data> {
        try {
            const { data : response } = await useFetch("/api/information/GetInformation")
            if(response === undefined) {
                return undefined;
            }
            return response;
        } catch(err) {

        }
    }

    saveToState(cmsContents : Array<POSTFormat>) {

        try {
            const informationEntryFactory : InformationFactory = new InformationFactory();
            this.repository = informationEntryFactory.create(cmsContents);
        } catch(err){
            console.log("saveToState error");
            console.log(err)
        }

    }

    async saveToCMS(information : POSTFormat) : Promise<boolean> {
        try {
            const response = await useFetch("/api/information/PostInformation", {
                method: 'POST',
                body: information,
                headers: {
                    Accept: 'application/json'
                }
            })
    
            if (response.data.value !== "success") {
                return false;
            }
        } catch (err) {
            await navigateTo('/error')
        }
        return true
    }

}