import React from 'react';

const SearchBar = ({ searchTerm, handleSearch, placeholder }) => {
  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearch}
        className="border border-gray-300 rounded-lg px-2 py-1 w-64" 
      />
    </div>
  );
};

export default SearchBar;
