import { useInfiniteQuery } from "@tanstack/react-query";
import { DefaultApi, GetCharactersRequest } from "../../../api";

export const CHARACTER_LIST_QUERY_KEY = "character-list";

export const useCharacterListQuery = (params: GetCharactersRequest) => {
  const api = new DefaultApi();

  const query = useInfiniteQuery({
    queryKey: [CHARACTER_LIST_QUERY_KEY, params],
    queryFn: ({ pageParam }) =>
      api.getCharacters({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.info?.next ? allPages.length + 1 : undefined;
    },
    retry: false,
    select: (data) => {
      const pages = data?.pages ?? [];
      return pages.flatMap((page) => page.results ?? []);
    },
  });

  return query;
};
