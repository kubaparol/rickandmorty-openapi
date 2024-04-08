import { ComponentPropsWithoutRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { cn, formUrlQuery, removeKeysFromQuery } from "@/src/utils";
import { Input } from "../ui/input";

export interface CharacterSearchInputProps
  extends ComponentPropsWithoutRef<"div"> {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

const SEARCH_QUERY_KEY = "name";
const MAX_SEARCH_LENGTH = 80;

export const CharacterSearchInput = (props: CharacterSearchInputProps) => {
  const {
    placeholder = "Search name...",
    value,
    onValueChange,
    className,
    ...rest
  } = props;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultValue = searchParams.get(SEARCH_QUERY_KEY) || "";

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";

      if (value) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: SEARCH_QUERY_KEY,
          value: value,
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
  }, [value, defaultValue, navigate, searchParams]);

  return (
    <div
      {...rest}
      className={cn(
        "flex items-center w-full overflow-hidden bg-gray-50 rounded-full px-4 py-1",
        className
      )}
    >
      <Search size={21} />

      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onValueChange(e.target.value)}
        defaultValue={defaultValue}
        className="text-base border-0 bg-gray-50 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        maxLength={MAX_SEARCH_LENGTH}
      />
    </div>
  );
};
