/**
 * 
 * @returns Array<Object>
 */
export const getCMSContents = async ( content_type : string) => {
    const {$client} = useNuxtApp()
    const { data:getContents } = await useAsyncData( () => $client.getEntries({
        content_type: content_type,
    }));
    return getContents

    // ドメイン層に入れるか
    const contents = getContents.value?.items;
    const parseContents = contents.map(item => item.fields);

    return parseContents
};

