import { CharacterCard } from "./CharacterCard";
import { Character } from "@/src/api";
import { useIntersectionObserver } from "@/src/hooks";
import { cn } from "@/src/utils";
import { ComponentPropsWithoutRef } from "react";
import { Skeleton } from "../ui/skeleton";

export interface CharacterListProps extends ComponentPropsWithoutRef<"ul"> {
  characters?: Character[];
  isLoading: boolean;
  onIntersecting: () => void;
}

export const CharacterList = (props: CharacterListProps) => {
  const { characters, isLoading, onIntersecting, className, ...rest } = props;

  const ref = useIntersectionObserver<HTMLDivElement>(onIntersecting);

  return (
    <>
      <ul
        {...rest}
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6",
          className
        )}
      >
        {characters?.map((character) => (
          <li key={character.id}>
            <CharacterCard character={character} />
          </li>
        ))}

        {isLoading &&
          new Array(5).fill(0).map((_, index) => (
            <li key={index} className="h-full aspect-square rounded-2xl">
              <Skeleton className="h-full" />
            </li>
          ))}
      </ul>

      <div ref={ref} className="h-2 -translate-y-96" />
    </>
  );
};
