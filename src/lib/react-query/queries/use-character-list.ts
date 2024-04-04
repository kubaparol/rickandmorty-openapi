import { useInfiniteQuery } from "@tanstack/react-query";
import { DefaultApi, GetCharactersRequest } from "../../../api";
import { useMemo } from "react";

export const CHARACTER_LIST_QUERY_KEY = "character-list";

export const useCharacterListQuery = (params: GetCharactersRequest) => {
  const api = new DefaultApi();

  const query = useInfiniteQuery({
    queryKey: [CHARACTER_LIST_QUERY_KEY],
    queryFn: ({ pageParam }) =>
      api.getCharacters({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.info?.next ? allPages.length + 1 : undefined;
    },
  });

  const data = useMemo(() => {
    const pages = query.data?.pages ?? [];
    return pages.flatMap((page) => page.results ?? []);
  }, [query.data]);

  return { ...query, data };
};
