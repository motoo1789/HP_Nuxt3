/** 新着情報用 Contentful content type ID（.env の表記ゆれを吸収） */
export function resolveInformationContentType(
  runtimeType?: string,
): string | undefined {
  const candidates = [
    runtimeType,
    import.meta.env.NUXT_PUBLIC_CONTENTFUL_CONTENT_TYPE_INFORMATIONL,
    import.meta.env.NEXT_PUBLIC_CONTENTFUL_CONTENT_TYPE_INFORMATIONL,
    import.meta.env.NUXT_PUBLIC_CONTENTFUL_CONTENT_TYPE_INFORMATION,
    import.meta.env.NEXT_PUBLIC_CONTENTFUL_CONTENT_TYPE_INFORMATION,
    import.meta.env.NUXT_PUBLIC_CONTENTFUL_CONTENT_TYPE_NEWINFORMATION,
    import.meta.env.NEXT_PUBLIC_CONTENTFUL_CONTENT_TYPE_NEWINFORMATION,
  ];

  for (const value of candidates) {
    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }
  }
  return undefined;
}
