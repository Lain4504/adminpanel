import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const Filter = ({ filterField, filterValue, setFilterValue, data, headerName }) => {
  const uniqueValues = Array.from(new Set(data.map(item => item[filterField])));

  return (
    <div className="flex mb-4">
      <Select
        value={filterValue}
        onChange={setFilterValue}
        className="w-32 border border-gray-300 rounded"
        placeholder={`Select ${headerName}`} // Sử dụng headerName
      >
        <Option value="">Tất cả</Option>
        {uniqueValues.map((value) => (
          <Option key={value} value={value}>{value}</Option>
        ))}
      </Select>
    </div>
  );
};

export default Filter;
