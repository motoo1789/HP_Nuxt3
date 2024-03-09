

export interface BaseRepository {
    findByState() : Promise<Array<any>>
    findByCMS() :  Promise<data>
    saveToState(cmsContents : Array<Object>) : void;
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
        try {
            const { data : response } = await useFetch("/api/information/GetInformation")
            if(response === undefined) {
                return undefined;
            }
            return response;
        } catch(err) {

        }
    }

    saveToState(cmsContents : Array<Object>) {

        try {
            const projectEntryFactory : ProjectFactory = new ProjectFactory();
            this.repository = projectEntryFactory.create(cmsContents);
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