/**
 * CMSからアニメコンテンツを持ってくる
 * @params contentTtype string 
 * 
 * @returns Array<Object>
 */
export const getCMSContents = async ( contentTtype : string) => {
    const {$client} = useNuxtApp()
    const { data:getContents } = await useAsyncData( () => $client.getEntries({
        content_type: contentTtype,
    }));
    return getContents
};

