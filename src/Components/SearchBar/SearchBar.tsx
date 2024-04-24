import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useDebounce } from "../../Hooks/useDebounce";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 1000);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const searchHandler = (text: any) => {
    console.log("Searched:", text);
  };

  const debounceSearch = useDebounce(searchHandler, 1000);

  useEffect(() => {
    debounceSearch(searchValue);
  }, [searchValue]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 px-2 py-2 bg-neutral-500/30"
    >
      <input
        type="text"
        name="search"
        placeholder="Search heroes, players, items, teams..."
        onChange={handleChange}
        className="px-2 py-1 w-11/12 focus:outline-none border-0"
      />
      <button
        className="bg-green-500 text-white px-2 py-1"
        disabled={isSearching}
        type="submit"
      >
        {isSearching ? "..." : "Search"}
      </button>
    </form>
  );
};

export default SearchBar;
