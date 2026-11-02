export type ViewAnimeContents = {
  animeA: Array<string>;
  animeKa: Array<string>;
  animeSa: Array<string>;
  animeTa: Array<string>;
  animeNa: Array<string>;
  animeHa: Array<string>;
  animeMa: Array<string>;
  animeYa: Array<string>;
  animeRa: Array<string>;
  animeWa: Array<string>;
};

export function emptyAnimeView(): ViewAnimeContents {
  return {
    animeA: [],
    animeKa: [],
    animeSa: [],
    animeTa: [],
    animeNa: [],
    animeHa: [],
    animeMa: [],
    animeYa: [],
    animeRa: [],
    animeWa: [],
  };
}
