import axios from 'axios';

// Tạo một instance của axios
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Đặt URL cơ sở của API
});

// Thêm interceptor cho request
axiosInstance.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        config.headers['Authorization'] = `Bearer ${user.token}`; // Thêm token vào header
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Thêm interceptor cho response nếu cần
axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;