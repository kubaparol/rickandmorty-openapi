import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { formUrlQuery, removeKeysFromQuery } from "@/src/utils";
import { Input } from "../ui/input";

export interface CharacterSearchProps {
  placeholder?: string;
}

const SEARCH_QUERY_KEY = "name";
const MAX_SEARCH_LENGTH = 80;

export const CharacterSearch = (props: CharacterSearchProps) => {
  const { placeholder = "Search name..." } = props;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultValue = searchParams.get(SEARCH_QUERY_KEY) || "";

  const [characterName, setCharacterName] = useState(defaultValue);

  useEffect(() => {
    if (defaultValue === characterName) return;

    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";

      if (characterName) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: SEARCH_QUERY_KEY,
          value: characterName,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: [SEARCH_QUERY_KEY],
        });
      }

      navigate(newUrl);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [characterName, defaultValue, navigate, searchParams]);

  return (
    <div className="flex items-center w-full overflow-hidden bg-gray-50 rounded-full px-4 py-1">
      <Search size={21} />

      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => setCharacterName(e.target.value)}
        defaultValue={defaultValue}
        className="text-base border-0 bg-gray-50 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        maxLength={MAX_SEARCH_LENGTH}
      />
    </div>
  );
};
