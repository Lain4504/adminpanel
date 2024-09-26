import React from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleChangePassword = () => {
    // Điều hướng đến trang thay đổi mật khẩu
    navigate('/change-password');
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={handleChangePassword}>Thay đổi mật khẩu</Menu.Item>
      <Menu.Item onClick={onLogout}>Đăng xuất</Menu.Item>
    </Menu>
  );

  return (
    <div className="flex justify-end p-4 bg-white h-16">
      <Dropdown overlay={menu} trigger={['click']}>
        <a className="flex items-center cursor-pointer" onClick={e => e.preventDefault()}>
          <Avatar size="large" icon={<UserOutlined alt="Avatar" />} />
          <DownOutlined className="ml-2" />
        </a>
      </Dropdown>
    </div>
  );
};

export default Navbar;
