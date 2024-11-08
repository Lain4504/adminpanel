import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { notification, Spin, Popconfirm } from 'antd';
import SearchBar from './SearchBar';
import Filter from './Filter';
import { Button, Pagination } from 'antd';

const DataTable = ({
  columns,
  dataService,
  deleteService,
  entityName,
  createPath,
  updatePath,
  filterField,
  searchField
}) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleDelete = (id) => {
    deleteService(id)
      .then(() => {
        notification.success({
          message: `Item deleted successfully!`,
          placement: "topRight",
        });
        fetchData();
      })
      .catch(() => {
        notification.error({
          message: `Failed to delete item!`,
          placement: "topRight",
        });
      });
  };

  const fetchData = () => {
    setLoading(true);
    dataService()
      .then((res) => {
        const allData = res.data || [];
        if (!Array.isArray(allData) || allData.length === 0) {
          setData([]);
          setLoading(false);
          return;
        }

        const sortedData = allData.sort((a, b) => {
          return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
        });
        setData(sortedData);

        const totalPages = Math.ceil(sortedData.length / itemsPerPage);
        if (currentPage > totalPages && totalPages > 0) {
          setCurrentPage(totalPages);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
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
  }, [itemsPerPage, sortOrder, dataService]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredData = data
  .filter((item) => (filterValue === '' || item[filterField] === filterValue))
  .filter((item) =>
    String(item[searchField]).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <div>
        <h1 className='text-lg mb-4'>Quản lý {entityName}</h1>
        <hr className="my-4" />
        <div className="flex justify-between items-center mb-4">
          <Link to={createPath}>
            <Button type="primary">Create</Button>
          </Link>
          {searchField && (
            <SearchBar
              searchTerm={searchTerm}
              handleSearch={(e) => setSearchTerm(e.target.value)}
              placeholder={`Tìm kiếm ${entityName} theo ${columns.find(col => col.field === searchField)?.headerName.toLowerCase() || searchField.toLowerCase()}...`}
            />
          )}
        </div>
      </div>

      
      {filterField && (
        <Filter
          filterField={filterField}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          data={data}
          headerName={columns.find(col => col.field === filterField)?.headerName || filterField}
        />
      )}

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {columns.map((column) => (
                !column.hide && ( // Chỉ hiển thị các cột không bị ẩn
                  <th key={column.field} style={{ width: `${column.width}px` }} className="px-6 py-3">
                    <div className="flex items-center justify-between">
                      <span>{column.headerName}</span>
                      {column.field === 'id' && (
                        <Button
                          type="link"
                          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        >
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </Button>
                      )}
                    </div>
                  </th>
                )
              ))}
              <th className="px-6 py-3 text-center">Thao tác</th>
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
                <tr key={row.id} className="bg-white border-b hover:bg-gray-50">
                  {columns.map((column) => (
                    !column.hide && ( // Chỉ hiển thị các cột không bị ẩn
                      <td key={column.field} style={{ width: `${column.width}px` }} className="px-6 py-4">
                        {column.renderCell ? column.renderCell({ row }) : row[column.field]}
                      </td>
                    )
                  ))}
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center items-center space-x-2">
                      <Link to={`${updatePath}/${row.id}`} onClick={() => localStorage.setItem('currentPage', currentPage)}>
                        <Button type="primary">Update</Button>
                      </Link>
                      <Popconfirm
                        title={`Are you sure you want to delete this item?`}
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
