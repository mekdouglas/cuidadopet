import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Search, Filter } from "lucide-react";

interface SearchFilter {
  id: string;
  label: string;
  value: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onFilter?: (filters: Record<string, string>) => void;
  filters?: SearchFilter[];
}

const defaultFilters: SearchFilter[] = [
  {
    id: "1",
    label: "Espécie",
    value: "species",
    options: [
      { value: "dog", label: "Cachorro" },
      { value: "cat", label: "Gato" },
      { value: "bird", label: "Pássaro" },
      { value: "other", label: "Outro" },
    ],
  },
  {
    id: "2",
    label: "Raça",
    value: "breed",
    options: [
      { value: "labrador", label: "Labrador" },
      { value: "poodle", label: "Poodle" },
      { value: "siamese", label: "Siamês" },
      { value: "persian", label: "Persa" },
    ],
  },
  {
    id: "3",
    label: "Idade",
    value: "age",
    options: [
      { value: "puppy", label: "Filhote (0-1 ano)" },
      { value: "young", label: "Jovem (1-3 anos)" },
      { value: "adult", label: "Adulto (3-8 anos)" },
      { value: "senior", label: "Idoso (8+ anos)" },
    ],
  },
];

const SearchBar = ({
  onSearch = () => console.log("Searching..."),
  onFilter = () => console.log("Filtering..."),
  filters = defaultFilters,
}: SearchBarProps) => {
  const [selectedFilters, setSelectedFilters] = React.useState<
    Record<string, string>
  >({});

  const handleFilterChange = (filterValue: string, selectedValue: string) => {
    const newFilters = {
      ...selectedFilters,
      [filterValue]: selectedValue,
    };
    setSelectedFilters(newFilters);
    onFilter(newFilters);
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm">
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder="Buscar paciente..."
            className="pl-10"
            onChange={(e) => onSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>

        <div className="flex gap-2">
          {filters.map((filter) => (
            <Select
              key={filter.id}
              onValueChange={(value) => handleFilterChange(filter.value, value)}
              value={selectedFilters[filter.value]}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={filter.label} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}

          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setSelectedFilters(
                Object.fromEntries(filters.map((f) => [f.value, "all"])),
              );
              onFilter({});
            }}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
