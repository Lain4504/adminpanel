import axios from "axios";

const BANNER_API = import.meta.env.VITE_API_URL + "/slider";

const getAllBanners = () => {
    return axios.get(`${BANNER_API}`);
}

const deleteBanner = (id) => {
    return axios.delete(`${BANNER_API}/${id}`);
}

const addBanner = (data) => {
    return axios.post(`${BANNER_API}`, data);
}

const getBannerById = (id) => {
    return axios.get(`${BANNER_API}/${id}`);
}

const updateBanner = (id, data) => {
    return axios.put(`${BANNER_API}/${id}`, data);
}

export { getAllBanners, deleteBanner, addBanner, getBannerById, updateBanner };