interface CMSFormat{
    createdInformationDate: string,
	shortContent: string,
	abstract: string,
	detaile: string,
}

class InformationFactory {

    constructor() {

    }

    create(cmsContents : Array<CMSFormat>) : Array<Information> {

        const createdInformationArray = new Array<Information>;

        cmsContents.items.forEach( notNormalizeContent => {
            const information : Information = new Information(
                new InformationAbstract(notNormalizeContent.fields.abstract),
                new InformationDetail(notNormalizeContent.fields.detail),
                new ShortContent(notNormalizeContent.fields.shortContent),
                new UpdateDate(notNormalizeContent.fields.updateDate)
            )
        })

        return createdInformationArray;
    }
}