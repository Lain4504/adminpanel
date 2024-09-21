// components/DataTable.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { notification, Spin, Popconfirm } from 'antd';
import SearchBar from './SearchBar';
import Filter from './Filter';
import { Button, Pagination } from 'antd';

const DataTable = ({ columns, dataService, deleteService, entityName, createPath, updatePath, filterField, searchField }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const handleDelete = (id) => {
    deleteService(id)
      .then(() => {
        notification.success({
          message: `${entityName} deleted successfully!`,
          placement: "topRight",
        });
        fetchData();
      })
      .catch(() => {
        notification.error({
          message: `Failed to delete the ${entityName}!`,
          placement: "topRight",
        });
      });
  };

  const fetchData = () => {
    setLoading(true);
    dataService()
      .then((res) => {
        const allData = res.data || [];
        setData(allData);

        const totalItems = allData.length;
        setTotalPages(Math.ceil(totalItems / itemsPerPage));
        setLoading(false);
      })
      .catch(() => {
        notification.error({
          message: `Failed to fetch ${entityName}s!`,
          placement: "topRight",
        });
        setData([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [itemsPerPage]);

  const filteredData = data
    .filter((item) => (filterValue === '' || item[filterField] === filterValue))
    .filter((item) =>
      String(item[searchField]).toLowerCase().includes(searchTerm.toLowerCase())
    );

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <div>
        <h1 className='text-lg mb-4'>Quản lý {entityName}s</h1>
        <hr className="my-4" />

        <div className="flex justify-between items-center mb-4">
          <Link to={createPath}>
            <Button type="primary">Create</Button>
          </Link>
          <SearchBar
            searchTerm={searchTerm}
            handleSearch={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search ${entityName}s by ${searchField}...`}
          />
        </div>
      </div>

      {filterField && (
        <Filter
          filterField={filterField}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          data={data}
        />
      )}

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map((column) => (
                <th key={column.field} className="px-6 py-3">
                  {column.headerName}
                </th>
              ))}
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + 1} className="text-center py-4">
                  <Spin spinning={true} />
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="text-center py-4">
                  Không có nội dung
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => (
                <tr key={row.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  {columns.map((column) => (
                    <td key={column.field} className="px-6 py-4">
                      {column.renderCell ? column.renderCell({ row }) : row[column.field]}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center space-x-2">
                      <Link to={`${updatePath}/${row.id}`}>
                        <Button type="primary">Update</Button>
                      </Link>
                      <Popconfirm
                        title={`Are you sure you want to delete this ${entityName}?`}
                        onConfirm={() => handleDelete(row.id)}
                      >
                        <Button type="danger" className='bg-red-500'>
                          <p className='text-white'>Delete</p>
                          </Button>
                      </Popconfirm>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={filteredData.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger
          onShowSizeChange={(current, size) => {
            setItemsPerPage(size);
            setCurrentPage(1);
          }}
          showTotal={(total) => `Total ${total} items`}
        />
      </div>
    </>
  );
};

export default DataTable;
