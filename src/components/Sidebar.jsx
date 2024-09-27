import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  DashboardOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  FileAddOutlined,
  CommentOutlined,
  LogoutOutlined,
  MenuOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';

const { SubMenu } = Menu;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  
  const menuItems = [
    { key: '/', label: 'Home', icon: <HomeOutlined/> },
    { key: '/dashboard', label: 'Bảng thống kê', icon: <DashboardOutlined /> },
    {
      key: 'product-management',
      label: 'Sản phẩm',
      icon: <ShoppingOutlined />,
      children: [
        { key: '/product-management/products', label: 'Quản lý sách'},
        { key: '/product-management/collections', label: 'Quản lý bộ sưu tập'},
        { key: '/product-management/authors', label: 'Quản lý tác giả'},
        { key: '/product-management/publishers', label: 'Quản lý nhà xuất bản'},
      ],
    },
    { key: '/order-management/orders', label: 'Đơn hàng', icon: <ShoppingCartOutlined /> },
    {
      key: 'post-management', 
      label: 'Bài viết',
      icon: <FileAddOutlined />,
      children: [
        { key: '/post-management/posts', label: 'Quản lý bài viết' },
        { key: '/post-management/categories', label: 'Quản lí thể loại bài viết' },
      ],
    },
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
          className={`transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-900 text-white">
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['/']}
              style={{ border: 'none' }}
            >
              {menuItems.map(({ key, label, icon, children }) => 
                children ? (
                  <SubMenu key={key} title={label} icon={icon}>
                    {children.map(subItem => (
                      <Menu.Item key={subItem.key} icon={subItem.icon} onClick={handleMenuItemClick}>
                        <Link to={subItem.key}>{subItem.label}</Link>
                      </Menu.Item>
                    ))}
                  </SubMenu>
                ) : (
                  <Menu.Item key={key} icon={icon} onClick={handleMenuItemClick}>
                    <Link to={key}>
                      {label}
                    </Link>
                  </Menu.Item>
                )
              )}
              <Menu.Divider />
            </Menu>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
