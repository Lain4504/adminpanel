import axiosInstance from '../context/AxiosConfig';

const BANNER_API = import.meta.env.VITE_API_URL + "/slider";

const getAllBanners = () => {
    return axiosInstance.get(`${BANNER_API}`);
}

const deleteBanner = (id) => {
    return axiosInstance.delete(`${BANNER_API}/${id}`);
}

const addBanner = (data) => {
    return axiosInstance.post(`${BANNER_API}`, data);
}

const getBannerById = (id) => {
    return axiosInstance.get(`${BANNER_API}/${id}`);
}

const updateBanner = (id, data) => {
    return axiosInstance.put(`${BANNER_API}/${id}`, data);
}

export { getAllBanners, deleteBanner, addBanner, getBannerById, updateBanner };