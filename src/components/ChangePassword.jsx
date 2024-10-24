import React, { useContext, useState } from 'react';
import { Button, Input, Modal, message } from 'antd';
import { changePassword } from '../services/UserService';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

const ChangePassword = ({ visible, onClose }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    const handleSave = () => {
        if (newPassword !== confirmPassword) {
            message.error('Mật khẩu không khớp');
            return;
        }
        if (newPassword.length < 6 || newPassword.length > 20) {
            message.error('Mật khẩu phải có ít nhất 6 ký tự và nhiều nhất 20 ký tự');
            return;
        }

        // Show confirmation modal
        Modal.confirm({
            title: "Xác nhận",
            content: <p>Bạn có chắc chắn muốn thay đổi mật khẩu không? Thao tác này không thể hoàn tác.</p>,
            onOk: handleConfirm,
            okText: "Có",
            cancelText: "Không",
        });
    };

    const handleConfirm = async () => {
        const data = {
            oldPassword,
            newPassword,
            token: currentUser.token,
        };

        try {
            await changePassword(data);
            message.success('Đổi mật khẩu thành công');
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (err) {
            message.error('Mật khẩu cũ không chính xác');
        }
        onClose(); // Close modal
    };

    return (
        <Modal
            title="Đổi mật khẩu"
            visible={visible}
            onCancel={onClose}
            footer={null}
        >
            <div className="password-form mb-5 mt-3">
                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Mật khẩu cũ</label>
                    <Input
                        required
                        placeholder="Mật khẩu cũ"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        type={showOldPassword ? 'text' : 'password'}
                        suffix={showOldPassword ? (
                            <EyeOutlined onClick={() => setShowOldPassword(!showOldPassword)} />
                        ) : (
                            <EyeInvisibleOutlined onClick={() => setShowOldPassword(!showOldPassword)} />
                        )}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Mật khẩu mới</label>
                    <Input
                        required
                        placeholder="Mật khẩu mới"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        type={showNewPassword ? 'text' : 'password'}
                        suffix={showNewPassword ? (
                            <EyeOutlined onClick={() => setShowNewPassword(!showNewPassword)} />
                        ) : (
                            <EyeInvisibleOutlined onClick={() => setShowNewPassword(!showNewPassword)} />
                        )}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Xác nhận mật khẩu</label>
                    <Input
                        required
                        placeholder="Xác nhận mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type={showConfirmPassword ? 'text' : 'password'}
                        suffix={showConfirmPassword ? (
                            <EyeOutlined onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                        ) : (
                            <EyeInvisibleOutlined onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                        )}
                    />
                </div>
                <Button onClick={handleSave} type="primary" style={{ width: '100%' }}>Lưu</Button>
            </div>
        </Modal>
    );
};

export default ChangePassword;
