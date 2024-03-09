class Information {
    private abstract : InformationAbstract;
    private detail : InformationDetail;
    private shortContent : ShortContent;
    private updateDate : UpdateDate;

    constructor(abstract : InformationAbstract, information : InformationDetail, shortContent : ShortContent, updateDate : UpdateDate) {
        this.abstract = abstract;
        this.detail = information;
        this.shortContent = shortContent;
        this.updateDate = updateDate;
    }
}