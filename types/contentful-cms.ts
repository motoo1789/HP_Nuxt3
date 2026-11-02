/** Contentful Delivery API の getEntries 結果（最小形） */
export type ContentfulEntryFields = Record<string, unknown>;

export type ContentfulEntry = {
  sys: { id: string; title?: string };
  fields: ContentfulEntryFields;
};

export type ContentfulEntryCollection = {
  items: ContentfulEntry[];
  total?: number;
};
