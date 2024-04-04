import { useCallback } from "react";
import { useCharacterListQuery } from "../lib";
import { CharacterList } from "../components/shared/CharacterList";
import { CharacterSearch } from "../components/shared/CharacterSearch";
import { useSearchParams } from "react-router-dom";

export const CharactersContainer = () => {
  const [searchParams] = useSearchParams();
  const searchName = searchParams.get("name") || "";

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useCharacterListQuery({ ...(searchName && { name: searchName }) });

  const onIntersectingHandler = useCallback(() => {
    if (isFetchingNextPage) return;

    if (hasNextPage) fetchNextPage();
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  return (
    <div className="bg-black/25">
      <div className="wrapper min-h-screen">
        <h1 className="text-3xl lg:text-5xl font-bold text-white my-8">
          Rick and Morty Universe
        </h1>

        <div className="grid gap-8">
          <CharacterSearch />

          <CharacterList
            characters={data}
            isLoading={isLoading}
            isError={isError}
            onIntersecting={onIntersectingHandler}
          />
        </div>
      </div>
    </div>
  );
};
