import { useQuery } from "@tanstack/react-query";
import { DefaultApi } from "../../../api/api-client-generated";

export const CHARACTER_LIST_QUERY_KEY = "character-list";

export const useCharacterListQuery = () => {
  const api = new DefaultApi();

  return useQuery({
    queryKey: [CHARACTER_LIST_QUERY_KEY],
    queryFn: () => api.getCharacters(),
  });
};
