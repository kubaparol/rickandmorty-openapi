import { useEffect, useState } from "react";
import { Character, DefaultApi } from "../api/api-client-generated";

export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const api = new DefaultApi();

    api
      .getCharacters()
      .then((characters) => {
        setCharacters(characters.results || []);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  return {
    characters,
    isLoading,
    isError,
  };
};
