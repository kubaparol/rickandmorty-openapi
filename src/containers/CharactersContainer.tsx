import { CharacterList } from "../components/CharacterList";
import { useCharacters } from "../hooks";

export const CharactersContainer = () => {
  const characters = useCharacters();

  return (
    <div className="bg-black/85">
      <div className="wrapper">
        <h1 className="text-3xl lg:text-5xl font-bold text-white my-8">
          Rick and Morty Universe
        </h1>

        <CharacterList {...characters} />
      </div>
    </div>
  );
};
