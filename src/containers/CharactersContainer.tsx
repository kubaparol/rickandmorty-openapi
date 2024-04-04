import { CharacterList } from "../components/CharacterList";
import { useCharacters } from "../hooks";

export const CharactersContainer = () => {
  const characters = useCharacters();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-center text-green-400 my-8">
        Rick and Morty Universe
      </h1>

      <CharacterList {...characters} />
    </div>
  );
};
