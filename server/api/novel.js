import fs from "fs";

export default defineEventHandler(async (event) => {
    const articles = JSON.parse(fs.readFileSync('assets/hobby_novel.json', 'utf-8')).novel;
    return articles;
  });