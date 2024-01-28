export default class GetAnimeSyllabary implements AnimeRepository {

    Syllabary = {
        A : "anime_a",
        Ka : "anime_ka"
    } as const

    find(): Object {
        return {}
    }
}