import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  DashboardOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  FileAddOutlined,
  UserOutlined,
  BuildOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';

const { SubMenu } = Menu;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);  // Trạng thái mở submenu
  const sidebarRef = useRef(null);

  const menuItems = [
    { key: '/', label: 'Bảng thống kê', icon: <DashboardOutlined /> },
    { key: '/user-management/users', label: 'Người dùng', icon: <UserOutlined /> },
    {
      key: 'product-management',
      label: 'Sản phẩm',
      icon: <ShoppingOutlined />,
      children: [
        { key: '/product-management/products', label: 'Quản lý sách' },
        { key: '/product-management/collections', label: 'Quản lý bộ sưu tập' },
        { key: '/product-management/authors', label: 'Quản lý tác giả' },
        { key: '/product-management/publishers', label: 'Quản lý nhà xuất bản' },
      ],
    },
    { key: '/order-management/orders', label: 'Đơn hàng', icon: <ShoppingCartOutlined /> },
    {
      key: 'post-management',
      label: 'Bài viết',
      icon: <FileAddOutlined />,
      children: [
        { key: '/post-management/posts', label: 'Quản lý bài viết' },
        { key: '/post-management/categories', label: 'Quản lý thể loại bài viết' },
      ],
    },
    {
      key: 'marketing-management',
      label: 'Marketing',
      icon: <BuildOutlined />,
      children: [
        { key: '/marketing-management/banners', label: 'Quản lý biểu ngữ' },
        { key: '/marketing-management/ads', label: 'Quản lý quảng cáo' },
      ],
    },
  ];

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

  const handleOpenChange = (keys) => {
    // Đảm bảo chỉ có một submenu mở tại một thời điểm
    setOpenKeys(keys);
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
    <div>
      <aside
        ref={sidebarRef}
        id="default-sidebar"
        className={`transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-white text-white">
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={['/']}
            style={{ border: 'none' }}
            openKeys={openKeys} // Truyền trạng thái mở của submenu
            onOpenChange={handleOpenChange} // Cập nhật trạng thái khi mở submenu
          >
            {menuItems.map(({ key, label, icon, children }) =>
              children ? (
                <SubMenu key={key} title={label} icon={icon}>
                  {children.map((subItem) => (
                    <Menu.Item key={subItem.key} icon={subItem.icon} onClick={handleMenuItemClick}>
                      <Link to={subItem.key}>{subItem.label}</Link>
                    </Menu.Item>
                  ))}
                </SubMenu>
              ) : (
                <Menu.Item key={key} icon={icon} onClick={handleMenuItemClick}>
                  <Link to={key}>{label}</Link>
                </Menu.Item>
              )
            )}
            <Menu.Divider />
          </Menu>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
