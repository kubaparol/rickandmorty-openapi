import { useCharacters } from "../hooks";

export const CharactersContainer = () => {
  const { characters, isLoading, isError } = useCharacters();

  console.log(characters, isLoading, isError);
  return <div>CharactersContainer</div>;
};
