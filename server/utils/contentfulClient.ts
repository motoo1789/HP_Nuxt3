import { createClient } from "contentful";
import type { ContentfulClientApi, CreateClientParams } from "contentful";

function envString(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function getContentfulClientParams(): CreateClientParams | null {
  const space =
    envString(process.env.NUXT_PUBLIC_CONTENTFUL_SPACE_ID) ||
    envString(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID);
  const accessToken =
    envString(process.env.NUXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) ||
    envString(process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN);
  if (!space || !accessToken) {
    return null;
  }
  return {
    space,
    accessToken,
    environment:
      envString(process.env.NUXT_PUBLIC_CONTENTFUL_ENVIROMENT) ||
      envString(process.env.NEXT_PUBLIC_CONTENTFUL_ENVIROMENT) ||
      "master",
  };
}

export function createContentfulClient(): ContentfulClientApi<undefined> {
  const clientParams = getContentfulClientParams();
  if (!clientParams) {
    throw createError({
      statusCode: 503,
      statusMessage:
        "Contentful is not configured. Set NEXT_PUBLIC_CONTENTFUL_SPACE_ID and NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN.",
    });
  }
  return createClient(clientParams);
}
