import fs from "fs";
import path from 'path';

export default defineEventHandler(async (event) => {
    const articles = JSON.parse(fs.readFileSync('assets/hobby_anime.json', 'utf-8')).anime;
    console.log("api server")
    console.log(articles)
    console.log(process.env?.CTF_SPACE_ID)

    return articles;
  });