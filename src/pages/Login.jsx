import React, { useContext, useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { login } from '../service/UserService';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmitHandler = async (values) => {
        setLoading(true);
        const { email, password } = values;

        // Handle login
        let account = { email, password };
        login(account)
            .then(res => {
                const user = jwtDecode(res.data.token); // Decode the JWT token
                dispatch({ type: "LOGIN", payload: user });
                navigate("/");
                notification.success({
                    message: 'Đăng nhập thành công',
                    description: 'Chào mừng bạn trở lại!',
                });
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
            })
            .catch(err => {
                notification.error({
                    message: 'Đăng nhập không thành công',
                    description: 'Vui lòng kiểm tra lại thông tin đăng nhập.',
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    ĐĂNG NHẬP
                </h2>
            </div>
            <hr className="my-4 w-1/2 mx-auto border-t-2 border-gray-300" />
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <Form
                    form={form}
                    onFinish={onSubmitHandler}
                    layout="vertical"
                    className="space-y-6"
                >
                    <Form.Item
                        label="Địa chỉ email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập email!',
                            },
                            {
                                type: 'email',
                                message: 'Định dạng email không hợp lệ!',
                            },
                        ]}
                    >
                        <Input
                            type="email"
                            className="block w-full py-1.5 text-gray-900 shadow-sm"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu!',
                            },
                            {
                                min: 6,
                                message: 'Mật khẩu phải có ít nhất 6 ký tự!',
                            },
                        ]}
                    >
                        <Input.Password
                            className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>

                    <div className="flex items-center justify-between">
                        <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">
                            Quên mật khẩu?
                        </Link>
                    </div>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full"
                            loading={loading}
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;
