type ContentfulPublicRuntime = {
  contentfulSpaceId?: string;
  contentfulAccessToken?: string;
  contentfulEnviroment?: string;
};

function envString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

/** runtimeConfig + .env（NUXT_PUBLIC / NEXT_PUBLIC）から Contentful 設定を集める */
export function getContentfulPublicConfig(config: ContentfulPublicRuntime) {
  const meta = import.meta.env as Record<string, string | undefined>;

  const space =
    envString(config.contentfulSpaceId) ||
    envString(meta.NUXT_PUBLIC_CONTENTFUL_SPACE_ID) ||
    envString(meta.NEXT_PUBLIC_CONTENTFUL_SPACE_ID) ||
    envString(process.env.NUXT_PUBLIC_CONTENTFUL_SPACE_ID) ||
    envString(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID);

  const accessToken =
    envString(config.contentfulAccessToken) ||
    envString(meta.NUXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) ||
    envString(meta.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) ||
    envString(process.env.NUXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) ||
    envString(process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN);

  if (!space || !accessToken) {
    return null;
  }

  const environment =
    envString(config.contentfulEnviroment) ||
    envString(meta.NUXT_PUBLIC_CONTENTFUL_ENVIROMENT) ||
    envString(meta.NEXT_PUBLIC_CONTENTFUL_ENVIROMENT) ||
    envString(process.env.NUXT_PUBLIC_CONTENTFUL_ENVIROMENT) ||
    envString(process.env.NEXT_PUBLIC_CONTENTFUL_ENVIROMENT) ||
    "master";

  return { space, accessToken, environment };
}
