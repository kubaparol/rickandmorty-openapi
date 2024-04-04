import { useCallback } from "react";
import { useCharacterListQuery } from "../lib";
import { CharacterList } from "../components/shared/CharacterList";
import { useSearchParams } from "react-router-dom";
import { CharacterNameSearch } from "../components/shared/CharacterNameSearch";
import { CharacterStatusSelect } from "../components/shared/CharacterStatusSelect";

export const CharactersContainer = () => {
  const [searchParams] = useSearchParams();
  const searchName = searchParams.get("name") || "";
  const searchStatus = searchParams.get("status") || "";

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useCharacterListQuery({
    ...(searchName && { name: searchName }),
    ...(searchStatus && { status: searchStatus }),
  });

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
          <div className="flex items-center gap-2">
            <CharacterNameSearch />
            <CharacterStatusSelect />
          </div>

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
