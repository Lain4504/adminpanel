import React, { useState, useEffect, useRef } from 'react';
import Footer from "./Footer";
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import CollectionsIcon from '@mui/icons-material/Collections';
import PostAddIcon from '@mui/icons-material/PostAdd';
import FeedbackIcon from '@mui/icons-material/Feedback';
import LogoutIcon from '@mui/icons-material/Logout';
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null); // Tạo một ref cho sidebar

  // Hàm để toggle (đóng/mở) sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Hàm để xử lý khi nhấn bên ngoài sidebar
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Sử dụng useEffect để thêm và loại bỏ event listener
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Clean up event listener khi component unmount hoặc khi isOpen thay đổi
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div>
        {/* Nút để mở sidebar */}
        <button
          onClick={toggleSidebar}
          aria-controls="default-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            />
          </svg>
        </button>

        {/* Sidebar */}
        <aside
          ref={sidebarRef} // Thêm ref vào sidebar
          id="default-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
            } sm:translate-x-0`} // Khi mở thì dịch chuyển sidebar ra, ngược lại ẩn đi
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" >
                  <img src={assets.logo} alt='' className='w-48' />
                </a>
              </li>
              <li>
                <Link to={'/dashboard'}>
                  <a
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <DashboardCustomizeIcon/>
                    <span className="ms-3">Bảng thống kê</span>
                  </a>
                </Link>
              </li>
              <hr />
              <li>
                <Link to={'/product'}>
                  <a
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <ProductionQuantityLimitsIcon/>
                    <span className="flex-1 ms-3 whitespace-nowrap">Sản phẩm</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link to={'/order'}>
                  <a
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <CardTravelIcon/>
                    <span className="flex-1 ms-3 whitespace-nowrap">Đơn hàng</span>
                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                      3
                    </span>
                  </a>
                </Link>
              </li>

              <li>
                <Link to={'/collection'}>
                  <a
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <CollectionsIcon/>
                    <span className="flex-1 ms-3 whitespace-nowrap">Bộ sưu tập</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link to={'/post'}>
                  <a
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <PostAddIcon/>
                    <span className="flex-1 ms-3 whitespace-nowrap">Bài viết</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link to={'feedback'}>
                  <a
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <FeedbackIcon/>
                    <span className="flex-1 ms-3 whitespace-nowrap">Phản hồi</span>
                  </a>
                </Link>
              </li>
              <hr />
              <li>
                <a
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <LogoutIcon/>
                  <span className="flex-1 ms-3 whitespace-nowrap">Đăng xuất</span>
                </a>
              </li>
            </ul>
          </div>

        </aside>
      </div>

    </>
  );
};

export default Sidebar;
