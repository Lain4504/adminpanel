import React from 'react';
import { assets } from '../assets/assets';

const Product = () => {
  return (
    <>
      <h1 className='text-lg'>Quản lý sản phẩm</h1>
      {/* Thêm thẻ hr để tách các phần */}
      <hr className="my-4" />

      <div className="flex justify-between items-center mb-4">
        {/* Create Button on the left */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded focus:ring-2">
          Create
        </button>

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
              className="ml-2 w-4 h-4" // Adjust the size with width and height
            /></button>
        </div>
      </div>
      {/*Table */}

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">ID</th>
        <th scope="col" class="px-6 py-3">Product name</th>
        <th scope="col" class="px-6 py-3">Stock</th>
        <th scope="col" class="px-6 py-3">State</th>
        <th scope="col" class="px-6 py-3">Price</th>
        <th scope="col" class="px-6 py-3">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">1</th>
        <td class="px-6 py-4">Apple MacBook Pro 17"</td>
        <td class="px-6 py-4">20</td>
        <td class="px-6 py-4 text-green-400">ACTIVE</td>
        <td class="px-6 py-4">$2999</td>
        <td class="px-6 py-4 text-center">
          <div class="flex justify-center space-x-2">
            <button class="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">Edit</button>
            <button class="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500">Delete</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>



    </>
  );
}

export default Product;
