import { createContentfulClient } from "../utils/contentfulClient";

export default defineEventHandler(async () => {
  const client = createContentfulClient();
  const id = "4cc9JW3vkGlnH8B97ofmn9";
  return client.getEntry(id);
});
