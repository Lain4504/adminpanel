import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getAllCollections, deleteCollection } from "../service/CollectionService";

const Collection = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Số lượng sản phẩm hiển thị trên mỗi trang

  const handleDelete = (id) => {
    const confirmBox = window.confirm(
      "Do you really want to delete this collection?"
    );
    if (!confirmBox) return;

    deleteCollection(id)
      .then((res) => {
        toast.success("Collection deleted successfully!", {
          position: "top-right"
        });
        fetchData();
      })
      .catch((error) => {
        toast.error("Failed to delete the collection!", {
          position: "top-right"
        });
      });
  };

  const fetchData = () => {
    getAllCollections()
      .then((res) => {
        const allData = res.data;
        setData(allData);
        setTotalPages(Math.ceil(allData.length / itemsPerPage));
      })
      .catch((error) => {
        toast.error("Failed to fetch collections!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [itemsPerPage]); // Refetch data when itemsPerPage changes

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to the first page when items per page changes
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
   
      <h1 className='text-lg'>Quản lý bộ sưu tập</h1>

      <hr className="my-4" />

      <div className="flex justify-between items-center mb-4">
        <Link to={`/collections/new`}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded focus:ring-2">
            Create
          </button>
        </Link>

        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search collections..."
            className="border border-gray-300 rounded px-4 py-2"
          />
          <button>
            <img
              src={assets.search_icon}
              alt="Search Icon"
              className="ml-2 w-4 h-4"
            />
          </button>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((collection) => (
              <tr key={collection.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{collection.id}</th>
                <td className="px-6 py-4">{collection.name}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center space-x-2">
                    <Link to={`/collections/${collection.id}`}>
                      <button className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Update
                      </button>
                    </Link>
                    <button
                      className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                      onClick={() => handleDelete(collection.id)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          handleDelete(collection.id);
                        }
                      }}
                      tabIndex="0"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

  <div className="flex flex-col md:flex-row justify-between items-center mt-4">
  {/* Items per page */}
  <div className="flex flex-col md:flex-row items-center space-x-4 mb-4 md:mb-0">
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
</div>


  {/* Pagination */}
  <div className="flex flex-row items-center space-x-4">
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

export default Collection;