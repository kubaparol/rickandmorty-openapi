import { useNavigate, useSearchParams } from "react-router-dom";
import { formUrlQuery } from "@/src/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";

export interface CharacterStatusSelectProps {}

const SEARCH_QUERY_KEY = "status";

export const CharacterStatusSelect = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultValue = searchParams.get(SEARCH_QUERY_KEY) || "";
  const [isOpen, setIsOpen] = useState(false);

  const onChangeHandler = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: SEARCH_QUERY_KEY,
      value,
    });

    navigate(newUrl);
  };

  return (
    <Select
      onValueChange={onChangeHandler}
      defaultValue={defaultValue}
      open={isOpen}
      onOpenChange={() => setIsOpen(!isOpen)}
    >
      <SelectTrigger className="flex items-center w-full h-full overflow-hidden bg-gray-50 rounded-full px-4 py-1">
        <SelectValue placeholder="Status" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="alive" className="select-item p-regular-14">
          Alive
        </SelectItem>

        <SelectItem value="dead" className="select-item p-regular-14">
          Dead
        </SelectItem>

        <SelectItem value="unknown" className="select-item p-regular-14">
          Unknown
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
