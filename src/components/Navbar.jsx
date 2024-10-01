import React from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  console.log(authContext);
  const logout = () => {
    authContext.dispatch({ type: "LOGOUT" });
  }
  const handleChangePassword = () => {
    // Điều hướng đến trang thay đổi mật khẩu
    navigate('/change-password');
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={handleChangePassword}>Thay đổi mật khẩu</Menu.Item>
      <Menu.Item onClick={logout}>Đăng xuất</Menu.Item>
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
