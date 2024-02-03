interface AnimeRepository {
    find() : Object;
}


// 正規化
const contents = getContents.value?.items;
const parseContents = contents.map(item => item.fields);