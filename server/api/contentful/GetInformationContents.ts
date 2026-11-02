import { createClient } from "contentful";
import type { CreateClientParams } from "contentful";

function resolveInformationContentTypeId(): string | undefined {
  const candidates = [
    process.env.NUXT_PUBLIC_CONTENTFUL_CONTENT_TYPE_INFORMATIONL,
    process.env.NEXT_PUBLIC_CONTENTFUL_CONTENT_TYPE_INFORMATIONL,
    process.env.NUXT_PUBLIC_CONTENTFUL_CONTENT_TYPE_INFORMATION,
    process.env.NEXT_PUBLIC_CONTENTFUL_CONTENT_TYPE_INFORMATION,
    process.env.NUXT_PUBLIC_CONTENTFUL_CONTENT_TYPE_NEWINFORMATION,
    process.env.NEXT_PUBLIC_CONTENTFUL_CONTENT_TYPE_NEWINFORMATION,
  ];
  for (const value of candidates) {
    const trimmed = value?.trim();
    if (trimmed) {
      return trimmed;
    }
  }
  return undefined;
}

export default defineEventHandler(async () => {
  const contentType = resolveInformationContentTypeId();
  if (!contentType) {
    throw createError({
      statusCode: 503,
      statusMessage: "Information content type is not configured in environment variables.",
    });
  }

  const clientParams: CreateClientParams = {
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
    environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIROMENT || "master",
  };

  const client = createClient(clientParams);
  return client.getEntries({
    content_type: contentType,
    limit: 500,
  });
});
