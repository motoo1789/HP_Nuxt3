import { createContentfulClient } from "./contentfulClient";

export const getCMSContents = async (contentType: string) => {
  const client = createContentfulClient();
  return client.getEntries({ content_type: contentType });
};
