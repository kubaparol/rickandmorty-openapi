import { CharacterList } from "../components/CharacterList";
import { useCharacterListQuery } from "../lib";

export const CharactersContainer = () => {
  const { data, isLoading, isError } = useCharacterListQuery();

  return (
    <div className="bg-black/85">
      <div className="wrapper min-h-screen">
        <h1 className="text-3xl lg:text-5xl font-bold text-white my-8">
          Rick and Morty Universe
        </h1>

        <CharacterList
          characters={data?.results}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </div>
  );
};
