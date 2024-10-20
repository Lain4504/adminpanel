import axios from "axios";

const API_URL = "http://localhost:5146/api/slider";

const getAllBanners = () => {
    return axios.get(API_URL);
}

const deleteBanner = (id) => {
    return axios.delete(`${API_URL}/${id}`);
}

const addBanner = (data) => {
    return axios.post(API_URL, data);
}

const getBannerById = (id) => {
    return axios.get(`${API_URL}/${id}`);
}

const updateBanner = (id, data) => {
    return axios.put(`${API_URL}/${id}`, data);
}

export { getAllBanners, deleteBanner, addBanner, getBannerById, updateBanner };