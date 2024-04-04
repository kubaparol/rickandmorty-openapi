import { Character } from "../api/api-client-generated";
import { CharacterCard } from "./CharacterCard";
import { Skeleton } from "./Skeleton";

export interface CharacterListProps {
  characters: Character[];
  isLoading: boolean;
  isError: boolean;
}

export const CharacterList = (props: CharacterListProps) => {
  const { characters, isLoading } = props;

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {characters.map((character) => (
        <li key={character.id}>
          <CharacterCard character={character} />
        </li>
      ))}

      {isLoading &&
        new Array(4).fill(0).map((_, index) => (
          <li key={index} className="border h-72">
            <Skeleton />
          </li>
        ))}
    </ul>
  );
};
