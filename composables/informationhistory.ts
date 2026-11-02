import { resolveInformationContentType } from "~/utils/contentfulContentTypes";

export type InformationFields = Record<string, unknown> & {
  updateDate?: string;
  abstract?: string;
  detaile?: string;
};

function normalizeInformationFields(
  items: Array<{ fields: Record<string, unknown> }> | undefined,
): InformationFields[] {
  if (!items?.length) {
    return [];
  }
  return items.map((item) => item.fields as InformationFields);
}

/** Contentful から新着情報 fields 一覧を取得 */
export const useCMSContents = async (): Promise<InformationFields[]> => {
  try {
    const response = await $fetch<{ items: Array<{ fields: Record<string, unknown> }> }>(
      "/api/contentful/GetInformationContents",
    );
    return normalizeInformationFields(response.items);
  } catch (error) {
    console.warn("[information] API fetch failed, trying $client", error);
  }

  const { $client } = useNuxtApp();
  const contentType = resolveInformationContentType(
    useRuntimeConfig().public.contentfulInformationType,
  );

  if (!$client || !contentType) {
    return [];
  }

  const getContents = await $client.getEntries({
    content_type: contentType,
    limit: 500,
  });

  return normalizeInformationFields(getContents?.items);
};

function buildInformationPages(entries: InformationFields[]) {
  const withDate = entries.filter(
    (entry) => typeof entry.updateDate === "string" && entry.updateDate.trim() !== "",
  );

  const sorted = withDate.sort(
    (a, b) => Date.parse(b.updateDate ?? "") - Date.parse(a.updateDate ?? ""),
  );

  const showMaxInformation = 5;
  const pages: Array<{ page: number; contents: InformationFields[] }> = [];
  let remaining = [...sorted];

  while (remaining.length > 0) {
    pages.push({
      page: pages.length + 1,
      contents: remaining.slice(0, showMaxInformation),
    });
    remaining = remaining.slice(showMaxInformation);
  }

  return pages;
}

export const useUpdateInformation = () => {
  const parseUpdateInformation = async () => {
    const contents = await useCMSContents();
    return buildInformationPages(contents);
  };

  return {
    parseUpdateInformation,
  };
};

export const useUpdatePage = (currentpage: Ref<number>) => {
  return (nextpage: number) => (currentpage.value = nextpage);
};

export const init = (currentpage: Ref<number>) => () => currentpage.value = 1;

export const useCurrentPage = () => {
  const currentpage = useState("currentpage", () => 1);

  const updatePage = (pageRef: Ref<number>) => {
    return (nextpage: number) => (pageRef.value = nextpage);
  };

  return {
    currentpage,
    updatePage,
  };
};
