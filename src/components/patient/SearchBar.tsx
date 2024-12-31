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
import { searchPatients } from "@/lib/services/patients";
import { useToast } from "../ui/use-toast";
import { useDebounce } from "@/lib/hooks/use-debounce";

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
  onResults?: (patients: any[]) => void;
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
  onSearch,
  onFilter,
  onResults,
  filters = defaultFilters,
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedFilters, setSelectedFilters] = React.useState<
    Record<string, string>
  >({});
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const handleSearch = async (
    query: string,
    filters: Record<string, string>,
  ) => {
    setIsLoading(true);
    try {
      const results = await searchPatients(query, filters);
      if (onResults) {
        onResults(results);
      }
    } catch (error) {
      console.error("Error searching patients:", error);
      toast({
        title: "Erro",
        description: "Erro ao buscar pacientes. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    handleSearch(debouncedSearchQuery, selectedFilters);
  }, [debouncedSearchQuery, selectedFilters]);

  const handleFilterChange = (filterValue: string, selectedValue: string) => {
    const newFilters = {
      ...selectedFilters,
      [filterValue]: selectedValue,
    };
    setSelectedFilters(newFilters);
    if (onFilter) {
      onFilter(newFilters);
    }
  };

  const resetFilters = () => {
    const defaultFilterValues = Object.fromEntries(
      filters.map((f) => [f.value, "all"]),
    );
    setSelectedFilters(defaultFilterValues);
    if (onFilter) {
      onFilter(defaultFilterValues);
    }
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm">
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder="Buscar paciente..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (onSearch) {
                onSearch(e.target.value);
              }
            }}
            disabled={isLoading}
          />
          <Search
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isLoading ? "text-gray-300" : "text-gray-400"}`}
          />
        </div>

        <div className="flex gap-2">
          {filters.map((filter) => (
            <Select
              key={filter.id}
              value={selectedFilters[filter.value] || "all"}
              onValueChange={(value) => handleFilterChange(filter.value, value)}
              disabled={isLoading}
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
            onClick={resetFilters}
            disabled={isLoading}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
