import React, { useState } from 'react';
import { Modal, Input, Button, Form, message } from 'antd';
import { forgetPassword } from '../../service/UserService';

const ForgotPasswordModal = ({ visible, onCancel }) => {
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = (values) => {
        // `values.email` will contain the email input if the form is valid
        forgetPassword(values.email)
            .then((res) => {
                if (res.status === 200) {
                    setIsSending(true);
                }
            })
            .catch((err) => {
                message.error(err.response.data.message || 'Có lỗi xảy ra!');
            });
    };

    return (
        <Modal
            visible={visible}
            title="Quên mật khẩu"
            onCancel={onCancel}
            footer={null}
        >
            <Form
                name="forgotPassword"
                className="w-full"
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'Email không hợp lệ',
                        },
                        {
                            required: true,
                            message: 'Vui lòng nhập email của bạn',
                        },
                    ]}
                >
                    <Input
                        className="flex-1 rounded-md py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        type="text"
                        placeholder="Nhập email của bạn"
                        required
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full">
                        Gửi
                    </Button>
                </Form.Item>

                {isSending && (
                    <p className="text-green-500 text-center">
                        Vui lòng kiểm tra email của bạn để đặt lại mật khẩu.
                    </p>
                )}
            </Form>
        </Modal>
    );
};

export default ForgotPasswordModal;
