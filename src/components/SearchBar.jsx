import React from 'react'

const SearchBar = ({ searchTerm, handleSearch, placeholder }) => {
  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearch}
        className="border border-gray-300 rounded px-4 py-2"
      />
    </div>
  );
};

export default SearchBar
