import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  DashboardOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  FileAddOutlined,
  CommentOutlined,
  LogoutOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  
  const menuItems = [
    { key: '/', label: 'Home', icon: null },
    { key: '/dashboard', label: 'Bảng thống kê', icon: <DashboardOutlined /> },
    { key: '/products', label: 'Sản phẩm', icon: <ShoppingOutlined /> },
    { key: '/order', label: 'Đơn hàng', icon: <ShoppingCartOutlined /> },
    { key: '/collections', label: 'Bộ sưu tập', icon: <AppstoreOutlined /> },
    { key: '/post', label: 'Bài viết', icon: <FileAddOutlined /> },
    { key: '/feedback', label: 'Phản hồi', icon: <CommentOutlined /> },
  ];

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
          <MenuOutlined className="w-6 h-6" />
        </button>

        <aside
          ref={sidebarRef}
          id="default-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-900 text-white">
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['/']}
              style={{ border: 'none' }}
            >
              {menuItems.map(({ key, label, icon, badge }) => (
                <Menu.Item key={key} icon={icon} onClick={handleMenuItemClick}>
                  <Link to={key}>
                    {label}
                    {badge && (
                      <span className="badge">{badge}</span>
                    )}
                  </Link>
                </Menu.Item>
              ))}
              <Menu.Divider />
              <Menu.Item icon={<LogoutOutlined />} onClick={() => navigate('/login')}>
                Đăng xuất
              </Menu.Item>
            </Menu>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
