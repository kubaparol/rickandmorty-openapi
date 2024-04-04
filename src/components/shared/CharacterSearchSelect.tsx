import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export interface CharacterSearchItemProps {
  label: string;
  value: string;
}

export interface CharacterSearchSelectProps {
  placeholder: string;
  defaultValue: string;
  items: CharacterSearchItemProps[];
  onChange: (value: string) => void;
}

export const CharacterSearchSelect = (props: CharacterSearchSelectProps) => {
  const { placeholder, defaultValue, items, onChange } = props;

  return (
    <Select onValueChange={onChange} defaultValue={defaultValue}>
      <SelectTrigger className="flex items-center w-full h-[48px] overflow-hidden bg-gray-50 rounded-full px-4 py-1">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {items.map((item) => (
          <SelectItem
            key={item.value}
            value={item.value}
            className="select-item p-regular-14"
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
