import fs from "fs";
import path from 'path';

export default defineEventHandler(async (event) => {
    const articles = JSON.parse(fs.readFileSync('assets/hobby_novel.json', 'utf-8')).novel;
    return articles;
  });