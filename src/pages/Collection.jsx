import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react"
import { getAllCollections, deleteCollection } from "../service/CollectionService";
import { collectionColumns } from "../components/DataSet";
import { DataGrid } from "@mui/x-data-grid";

const Collection = () => {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([]);

  const handleDelete = (id) => {
    const confirmBox = window.confirm(
      "Do you really want to delete this collection?"
    )
    if (!confirmBox) return;

    deleteCollection(id)
      .then((res) => {
        toast.success("Collection deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        // Refetching the data instead of reloading
      })
      .catch((error) => {
        toast.error("Failed to delete the collection!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="flex items-center gap-4">
            <Link to={`/collections/${params.row.id}`} >
              <button className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                Update
              </button>
            </Link>
            <button
              className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500 " 
              onClick={() => handleDelete(params.row.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleDelete(params.row.id);
                }
              }}
              tabIndex="0"
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];
  
  useEffect(() => {
    getAllCollections().then((res) => {
      setData(res.data)
      setColumns(collectionColumns.concat(actionColumn))
    })
  }, [])

  return (
    <>
      <h1 className='text-lg'>Quản lý bộ sưu tập</h1>

      <hr className="my-4" />

      <div className="flex justify-between items-center mb-4">
        {/* Create Button on the left */}
        <Link to={`/collections/new`}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded focus:ring-2">
            Create
          </button>
        </Link>
        {/* Search bar on the right */}
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-300 rounded px-4 py-2"
          />
          <button>
            <img
              src={assets.search_icon}
              alt="Search Icon"
              className="ml-2 w-4 h-4"
            /></button>
        </div>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={columns}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </>
  );
}

export default Collection;
