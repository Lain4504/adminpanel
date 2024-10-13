import React, { useContext, useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { login } from '../../service/UserService';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Title from '../../components/Title';
import ForgotPasswordModal from './ForgotPassword';

const Login = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmitHandler = async (values) => {
        setLoading(true);
        const { email, password } = values;

        try {
            const res = await login({ email, password });
            dispatch({ type: "LOGIN", payload: { token: res.data.token } });
            localStorage.setItem("user", JSON.stringify({ token: res.data.token }));

            notification.success({
                message: 'Đăng nhập thành công',
                description: 'Chào mừng bạn trở lại!',
            });

            navigate('/');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Vui lòng kiểm tra lại thông tin đăng nhập.';

            notification.error({
                message: 'Đăng nhập không thành công',
                description: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    };
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-48 mx-auto md:h-screen lg:py-0">
                <a className="flex items-center mb-6 text-lg font-light text-gray-900 dark:text-white">
                <Title text1={'FOREVER'} text2={'Book Store Management'}/>
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            ĐĂNG NHẬP
                        </h1>
                        <Form
                            form={form}
                            onFinish={onSubmitHandler}
                            layout="vertical"
                            className="space-y-4 md:space-y-6"
                        >
                            <Form.Item
                                label="Địa chỉ email"
                                name="email"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập email!' },
                                    { type: 'email', message: 'Định dạng email không hợp lệ!' },
                                ]}
                            >
                                <Input type="email" className="flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                 />
                            </Form.Item>

                            <Form.Item
                                label="Mật khẩu"
                                name="password"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập mật khẩu!' },
                                    { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
                                ]}
                            >
                                <Input.Password
                                    className="flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>

                            <div className="flex items-center justify-between">
                                <a onClick={showModal} className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                                    Quên mật khẩu?
                                </a>
                                 <ForgotPasswordModal visible={isModalVisible} onCancel={handleCancel} />
                            </div>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" loading={loading}>
                                    Đăng nhập
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
