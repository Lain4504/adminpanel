import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import CollectionsIcon from '@mui/icons-material/Collections';
import PostAddIcon from '@mui/icons-material/PostAdd';
import FeedbackIcon from '@mui/icons-material/Feedback';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate(); // Hook để điều hướng

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleMenuItemClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div>
        <button
          onClick={toggleSidebar}
          aria-controls="default-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 ms-3 text-white rounded-lg sm:hidden hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 bg-black"
        >
          <span className="sr-only">Open sidebar</span>
          <MenuOpenIcon
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
          />
        </button>

        <aside
          ref={sidebarRef}
          id="default-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-900 text-white">
            <ul className="space-y-2 font-medium">
              <li>
                <Link to="/" onClick={handleMenuItemClick} className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 group">
                </Link>
              </li>
              <li>
                <Link to={'/dashboard'} onClick={handleMenuItemClick}>
                  <div className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 group">
                    <DashboardCustomizeIcon />
                    <span className="ms-3">Bảng thống kê</span>
                  </div>
                </Link>
              </li>
              <hr className="border-gray-700" />
              <li>
                <Link to={'/product'} onClick={handleMenuItemClick}>
                  <div className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 group">
                    <ProductionQuantityLimitsIcon />
                    <span className="flex-1 ms-3 whitespace-nowrap">Sản phẩm</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link to={'/order'} onClick={handleMenuItemClick}>
                  <div className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 group">
                    <CardTravelIcon />
                    <span className="flex-1 ms-3 whitespace-nowrap">Đơn hàng</span>
                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                      3
                    </span>
                  </div>
                </Link>
              </li>
              <li>
                <Link to={'/collections'} onClick={handleMenuItemClick}>
                  <div className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 group">
                    <CollectionsIcon />
                    <span className="flex-1 ms-3 whitespace-nowrap">Bộ sưu tập</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link to={'/post'} onClick={handleMenuItemClick}>
                  <div className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 group">
                    <PostAddIcon />
                    <span className="flex-1 ms-3 whitespace-nowrap">Bài viết</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link to={'feedback'} onClick={handleMenuItemClick}>
                  <div className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 group">
                    <FeedbackIcon />
                    <span className="flex-1 ms-3 whitespace-nowrap">Phản hồi</span>
                  </div>
                </Link>
              </li>
              <hr className="border-gray-700" />
              <li>
                <div className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 group" onClick={() => navigate('/login')}>
                  <LogoutIcon />
                  <span className="flex-1 ms-3 whitespace-nowrap">Đăng xuất</span>
                </div>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
