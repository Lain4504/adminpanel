// components/Filter.js
import React from 'react';

const Filter = ({ filterField, filterValue, setFilterValue, data }) => {
  const uniqueValues = Array.from(new Set(data.map(item => item[filterField])));

  return (
    <div className="flex mb-4">
      <select
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        className="border border-gray-300 rounded px-2 py-1"
      >
        <option value="">All {filterField}</option>
        {uniqueValues.map((value) => (
          <option key={value} value={value}>{value}</option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
