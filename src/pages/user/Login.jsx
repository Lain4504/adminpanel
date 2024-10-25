import React, { useContext, useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, GoogleOutlined } from '@ant-design/icons';
import { login } from '../../services/UserService';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Title from '../../components/Title';
import ForgotPasswordModal from './ForgotPassword';
import { jwtDecode } from 'jwt-decode';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const Login = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmitHandler = async (values) => {
        const { email, password } = values; // Get email and password from form values
        setLoading(true);

        try {
            const res = await login({ email, password });
            const { token, refreshToken, expirationDate } = res.data;
            const refreshExpirationTime = new Date(expirationDate).toISOString();
            console.log("In Login - refreshExpirationTime:", refreshExpirationTime);

            // Decode token for expiration time
            const decodedToken = jwtDecode(token);
            const expirationTime = new Date(decodedToken.exp * 1000);
            const userId = decodedToken[Object.keys(decodedToken).find(key => key.includes("nameidentifier"))];

            // Save to local storage
            const userData = { token, refreshToken, userId, expirationTime, refreshExpirationTime };
            dispatch({ type: "LOGIN", payload: userData });
            localStorage.setItem("user", JSON.stringify(userData));

            // Log saved data
            console.log("Saved User Data in localStorage:", JSON.parse(localStorage.getItem("user")));

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

    const handleGoogleLogin = async (credentialResponse) => {
        console.log("Credential response:", credentialResponse);

        try {
            const res = await fetch('https://localhost:3001/api/user/google-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: credentialResponse.credential }),
            });

            console.log("Response Status:", res.status);
            const data = await res.json();
            console.log("API Response Data:", data);

            const { token, refreshToken, expirationDate } = data;

            // Decode the JWT token
            const decodedToken = jwtDecode(token);
            const expirationTime = new Date(decodedToken.exp * 1000);
            const userId = decodedToken[Object.keys(decodedToken).find(key => key.includes("nameidentifier"))];

            dispatch({ type: 'LOGIN', payload: { token, refreshToken, expirationTime, userId } });

            localStorage.setItem("user", JSON.stringify({ token, refreshToken, expirationTime, userId, refreshExpirationTime: new Date(expirationDate).toISOString() }));

            notification.success({
                message: 'Đăng nhập thành công',
                description: 'Chào mừng bạn!',
            });

            navigate('/');
        } catch (error) {
            console.error("Error during Google login:", error);
            notification.error({
                message: 'Đăng nhập Google không thành công',
                description: error.message || 'Có lỗi xảy ra trong quá trình đăng nhập Google.',
            });
        }
    };

    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => setIsModalVisible(true);
    const handleCancel = () => setIsModalVisible(false);

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-48 mx-auto md:h-screen lg:py-0">
                <a className="flex items-center mb-6 text-lg font-light text-gray-900 dark:text-white">
                    <Title text1={'FOREVER'} text2={'Book Store Management'} />
                </a>
                <div className="w-full bg-white rounded-lg border border-gray-300 shadow-lg dark:border-2 dark:border-gray-600 md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
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
                                <Input type="email"
                                    placeholder="Nhập địa chỉ email"
                                    className="block w-full rounded-md border-2 border-gray-300 py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-gray-200" />
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
                                    className="w-full rounded-md border-2 border-gray-300 py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-gray-200"
                                    placeholder="Nhập mật khẩu"
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
                                <button
                                    type="submit"
                                    className={`w-full rounded-md bg-indigo-600 text-white py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={loading}
                                >
                                    {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                                </button>
                            </Form.Item>
                            <Form.Item>
                                <GoogleOAuthProvider clientId={'865045586884-kgg6tff2nje4jfle2n2mr3ts463can1l.apps.googleusercontent.com'}>
                                    <GoogleLogin
                                        onSuccess={handleGoogleLogin}
                                        onError={() => {
                                            notification.error({
                                                message: 'Đăng nhập Google không thành công',
                                                description: 'Có lỗi xảy ra trong quá trình đăng nhập Google.',
                                            });
                                        }}
                                        render={(renderProps) => (
                                            <button
                                                onClick={renderProps.onClick}
                                                disabled={renderProps.disabled}
                                                className="w-full flex items-center justify-center mt-4 bg-gray-200 rounded-md py-2 text-gray-700 hover:bg-gray-300 focus:outline-none"
                                            >
                                                <GoogleOutlined style={{ marginRight: 8, color: '#4285F4' }} />
                                                Đăng nhập bằng Google
                                            </button>
                                        )}
                                    />
                                </GoogleOAuthProvider>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
