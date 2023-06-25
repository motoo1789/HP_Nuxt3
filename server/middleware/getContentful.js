import { createClient } from '~/plugins/contentful';

export default defineEventHandler(async (event) => {
    const client = createClient();
    const articles = await client.getEntries();
    console.log(articles.items);
  });