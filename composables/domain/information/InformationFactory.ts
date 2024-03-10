import { Information } from "./Information"
import { InformationAbstract } from "./InformationAbstract"
import { InformationDetail } from "./InformationDetail"
import { ShortContent } from "./ShortContent"
import { UpdateDate } from "./UpdateDate"

interface CMSFormat{
    createdInformationDate: string,
	shortContent: string,
	abstract: string,
	detaile: string,
}

interface POSTFormat {
    abstract : string,
    detaile : string,
    createdInformationDate : string
}

export class InformationFactory {

    constructor() {

    }

    create(cmsContents : Array<POSTFormat>) : Array<Information> {

            const createdInformationArray = new Array<Information>;

            cmsContents.items.forEach( notNormalizeContent => {
                const information : Information = new Information(
                    new InformationAbstract(notNormalizeContent.fields.abstract),
                    new InformationDetail(notNormalizeContent.fields.detaile), // cms側の定義が誤字しておりeが最後についてる
                    new ShortContent(notNormalizeContent.fields.shortContent),
                    new UpdateDate(notNormalizeContent.fields.updateDate)
                )
                createdInformationArray.push(information);
            })
            
            // cmsからの取得が古い順なのでソート
            // toro: cmsが順序保証してくれなくなったら日付でソート
            return createdInformationArray.reverse();

        
    }
}