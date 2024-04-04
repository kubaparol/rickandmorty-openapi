import { CharacterCard } from "./CharacterCard";
import { Character } from "@/src/api";
import { useIntersectionObserver } from "@/src/hooks";

export interface CharacterListProps {
  characters?: Character[];
  isLoading: boolean;
  isError: boolean;
  onIntersecting: () => void;
}

export const CharacterList = (props: CharacterListProps) => {
  const { characters, isLoading, onIntersecting } = props;

  const ref = useIntersectionObserver<HTMLDivElement>(onIntersecting);

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {characters?.map((character) => (
          <li key={character.id}>
            <CharacterCard character={character} />
          </li>
        ))}

        {isLoading &&
          new Array(4)
            .fill(0)
            .map((_, index) => <li key={index} className="border h-72"></li>)}
      </ul>

      <div ref={ref} className="h-2 -translate-y-60" />
    </>
  );
};
