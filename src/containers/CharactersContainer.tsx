import { useCallback } from "react";
import { CharacterList } from "../components/CharacterList";
import { useCharacterListQuery } from "../lib";

export const CharactersContainer = () => {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useCharacterListQuery({});

  const onIntersectingHandler = useCallback(() => {
    if (isFetchingNextPage) return;

    if (hasNextPage) fetchNextPage();
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  return (
    <div className="bg-black/85">
      <div className="wrapper min-h-screen">
        <h1 className="text-3xl lg:text-5xl font-bold text-white my-8">
          Rick and Morty Universe
        </h1>

        <CharacterList
          characters={data}
          isLoading={isLoading}
          isError={isError}
          onIntersecting={onIntersectingHandler}
        />
      </div>
    </div>
  );
};
