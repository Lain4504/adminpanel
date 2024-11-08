import axiosInstance from '../context/AxiosConfig';
const ADS_API = import.meta.env.VITE_API_URL + "/ads";

const addAds = (data) => {
    return axiosInstance.post(`${ADS_API}`, data);
};
const getAllAds = () => {
    return axiosInstance.get(`${ADS_API}`);
};
const deleteAds = (id) => {
    return axiosInstance.delete(`${ADS_API}/${id}`);
};

const getAdsById = (adsId) => {
    return axiosInstance.get(`${ADS_API}/${adsId}`);
};

const updateAds = (id, data) => {
    return axiosInstance.put(`${ADS_API}/${id}`, data);
};

export { addAds, deleteAds, getAdsById, updateAds, getAllAds };