import React, { useContext, useState } from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import ChangePassword from './ChangePassword'; // Import ChangePassword component
import { logout } from '../services/UserService';

const Navbar = () => {
    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);
    const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility

    const handleLogout = async () => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            try {
                await logout(user.refreshToken);
                console.log("Đăng xuất thành công");
            } catch (error) {
                console.error("Lỗi khi gọi API logout:", error);
            }
        }

        dispatch({ type: "LOGOUT", isSessionExpired: true });
        localStorage.removeItem("user");

        navigate('/login');
    };

    const handleChangePassword = () => {
        setIsModalVisible(true); // Show the modal when clicking "Change Password"
    };

    const menu = (
        <Menu>
            <Menu.Item onClick={handleChangePassword}>Thay đổi mật khẩu</Menu.Item>
            <Menu.Item onClick={handleLogout}>Đăng xuất</Menu.Item>
        </Menu>
    );

    return (
        <>
            <div className="flex justify-end p-4 bg-white h-16 sticky top-0 w-full z-10">
                <Dropdown overlay={menu} trigger={['click']}>
                    <a className="flex items-center cursor-pointer" onClick={e => e.preventDefault()}>
                        <Avatar size="large" icon={<UserOutlined alt="Avatar" />} />
                        <DownOutlined className="ml-2" />
                    </a>
                </Dropdown>
            </div>
            {/* Modal for Change Password */}
            <ChangePassword visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
        </>
    );
};

export default Navbar;
