import React, { useState, useEffect } from 'react';
import { getAllOrders } from '../../service/OrderService'
import { orderColumns } from '../../context/DataSet'
import { notification, Spin, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { Button, Pagination } from 'antd';
import Filter from '../../components/Filter';

const OrderList = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [filterValue, setFilterValue] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // Trạng thái sắp xếp
  const updatePath="/order-management/orders";
  const filterField="state";
  

  const fetchData = () => {
    setLoading(true);
    getAllOrders()
      .then((res) => {
        const allData = res.data || [];
        // Sắp xếp toàn bộ dữ liệu
        const sortedData = allData.sort((a, b) => {
          return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
        });
        setData(sortedData);
        setLoading(false);
      })
      .catch(() => {
        notification.error({
          message: `Failed to fetch Order!`,
          placement: "topRight",
        });
        setData([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [itemsPerPage, sortOrder]); // Thay đổi sortOrder sẽ gọi lại fetchData

  const filteredData = data
    .filter((item) => (filterValue === '' || item[filterField] === filterValue));

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <div>
        <h1 className='text-lg mb-4'>Quản lý Order</h1>
        <hr className="my-4" />
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
              {orderColumns.map((column) => (
                <th key={column.field} className="px-6 py-3">
                  <div className="flex items-center justify-between">
                    <span>{column.headerName}</span>
                    {column.field === 'id' && ( // Thêm nút sắp xếp cho trường id
                      <Button
                        type="link"
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      >
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </Button>
                    )}
                  </div>
                </th>
              ))}
              <th className="px-6 py-3">Actions</th>
            </tr>
            </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={orderColumns.length + 1} className="text-center py-4">
                  <Spin spinning={true} />
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={orderColumns.length + 1} className="text-center py-4">
                  Không có nội dung
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => (
                <tr key={row.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  {orderColumns.map((column) => (
                    <td key={column.field} className="px-6 py-4">
                      {column.renderCell ? column.renderCell({ row }) : row[column.field]}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center space-x-2">
                      <Link to={`${updatePath}/${row.id}`}
                        onClick={() => localStorage.setItem('currentPage', currentPage)}>
                        <Button type="primary">View Details</Button>
                      </Link>
                      <Link to={`/order-state/${row.id}`}>
                        <Button type="danger" className='bg-green-400'>Change State</Button>
                      </Link>
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

export default OrderList
