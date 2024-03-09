

export interface BaseRepository {
    findByState() : Promise<Array<any>>
    findByCMS() :  Promise<data> | undefined
    saveToState(cmsContents : Array<Object>) : Object;
    saveToCMS(information : POSTFormat) : Object;
}

interface POSTFormat {
    abstract : string,
    detaile : string,
    createdInformationDate : string
}

export class InformationRepository implements BaseRepository {
    
    private repository : Array<any> | undefined;

    constructor() {

        this.repository = undefined;
    }

    async findByState() : Promise<Array<any>>  {

        return new Array<any>;
    }

    async findByCMS() : Promise<data> {

    }

    saveToState(cmsContents : Array<Object>) : Object {

        
        return {}
    }

    async saveToCMS(information : POSTFormat) : Promise<boolean> {
        try {
            const response = await useFetch("/api/contentful/PostInformation", {
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