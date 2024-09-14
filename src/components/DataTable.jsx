import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Spin, Popconfirm } from "antd";

const DataTable = ({ columns, dataService, deleteService, entityName, createPath, updatePath }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true); // Thêm state loading

  const handleDelete = (id) => {
    deleteService(id)
      .then(() => {
        toast.success(`${entityName} deleted successfully!`, { position: "top-right" });
        fetchData();
      })
      .catch(() => {
        toast.error(`Failed to delete the ${entityName}!`, { position: "top-right" });
      });
  };

  const fetchData = () => {
    setLoading(true); // Bật loading trước khi fetch
    setTimeout(() => { // Tạo độ trễ giả (1 giây)
      dataService()
        .then((res) => {
          const allData = res.data;
          setData(allData);
          setTotalPages(Math.ceil(allData.length / itemsPerPage));
          setLoading(false); // Tắt loading sau khi fetch xong
        })
        .catch(() => {
          toast.error(`Failed to fetch ${entityName}s!`, { position: "top-right" });
          setLoading(false); // Tắt loading nếu fetch thất bại
        });
    }, 1000); // Đặt thời gian chờ 1 giây
  };

  useEffect(() => {
    fetchData();
  }, [itemsPerPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <h1 className='text-lg'>Quản lý {entityName}s</h1>
      <hr className="my-4" />

      <div className="flex justify-between items-center mb-4">
        <Link to={createPath}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded focus:ring-2">
            Create
          </button>
        </Link>

        <div className="flex items-center">
          <input
            type="text"
            placeholder={`Search ${entityName}s...`}
            className="border border-gray-300 rounded px-4 py-2"
          />
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map((column) => (
                <th key={column.field} scope="col" className="px-6 py-3">
                  {column.headerName}
                </th>
              ))}
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? ( // Hiển thị các ô giả với Spin khi đang loading
              Array.from({ length: 1 }).map((_, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-6 py-4">
                      <Spin spinning={true} />
                    </td>
                  ))}
                  <td className="px-6 py-4 text-center">
                    <Spin spinning={true} />
                  </td>
                </tr>
              ))
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
                        <button className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                          Update
                        </button>
                      </Link>
                      <Popconfirm
                        title={`Are you sure you want to delete this ${entityName}?`}
                        onConfirm={() => handleDelete(row.id)}
                        onCancel={() => {}}
                        okText="Yes"
                        cancelText="No"
                      >
                        <button className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500">
                          Delete
                        </button>
                      </Popconfirm>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-2">
          <span>Show</span>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
          <span>items per page</span>
        </div>

        <div className="flex space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            First
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last
          </button>
        </div>
      </div>
    </>
  );
};

export default DataTable;
