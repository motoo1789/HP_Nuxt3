import fs from "fs";

export default defineEventHandler(async (event) => {
    const articles = JSON.parse(fs.readFileSync('assets/hobby_anime.json', 'utf-8')).anime;

    return articles;
  });