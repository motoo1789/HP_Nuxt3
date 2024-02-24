import fs from "fs";
import path from 'path';

export default defineEventHandler(async (event) => {
    const articles = JSON.parse(fs.readFileSync('assets/hobby_comic.json', 'utf-8')).comic;

    return articles;
  });