import React, { useState } from "react";

import { SearchIcon } from "../utils/svg/svg";

type Props = {
  onSearch: (valeu: string) => void;
} 

export const SearchComponent: React.FC<Props> = ({ onSearch }) => {

  /**
   * Hooks.
   */

  const [value, setValue] = useState<string>('')

  const handleSearch = (event: any) => {
    event.preventDefault();
    onSearch(value);
  }


  const handleSearchInputChange = (event: any) => {
    setValue(event.target.value);
    if(!event.target.value) {
      onSearch('');
    }
  }

  return (
    <form onSubmit={handleSearch}>
      <div className="relative text-gray-600">
        <input
          onChange={handleSearchInputChange}
          value={value}
          className="border-2 border-gray-300 bg-white h-12 px-5 pr-10 rounded-lg text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder="Search..."
        />
        <button type="submit" className="relative right-8 top-1 ">
          <SearchIcon />
        </button>
      </div>
    </form>
  );
};
