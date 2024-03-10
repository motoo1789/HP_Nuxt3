import { InformationAbstract } from "./InformationAbstract"
import { InformationDetail } from "./InformationDetail"
import { ShortContent } from "./ShortContent"
import { UpdateDate } from "./UpdateDate"

export class Information {
    private abstract : InformationAbstract;
    private detail : InformationDetail;
    private shortContent : ShortContent;
    private updateDate : UpdateDate;

    constructor(abstract : InformationAbstract, detail : InformationDetail, shortContent : ShortContent, updateDate : UpdateDate) {
        this.abstract = abstract;
        this.detail = detail;
        this.shortContent = shortContent;
        this.updateDate = updateDate;
    }

    public view() : Object {
        return {
            abstract : this.abstract.abstract,
            detail : this.detail.detail,
            updateDate : this.updateDate.updateDate
        }
    }
}