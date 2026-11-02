import type { ContentfulEntryFields } from "~/types/contentful-cms";

export function contentfulFieldString(fields: ContentfulEntryFields, key: string): string {
  const value = fields[key];
  return typeof value === "string" ? value : "";
}

export function contentfulAssetFile(
  fields: ContentfulEntryFields,
  key: string,
): { url: string; fileName: string } {
  const asset = fields[key] as
    | { fields?: { file?: { url?: string; fileName?: string } } }
    | undefined;
  return {
    url: asset?.fields?.file?.url ?? "",
    fileName: asset?.fields?.file?.fileName ?? "",
  };
}
