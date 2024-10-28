import axios from "axios";
const ADS_API = import.meta.env.VITE_API_URL + "/ads";

const addAds= (data) => {
    return axios.post(`${ADS_API}`, data);
};
const getAllAds= () => {
    return axios.get(`${ADS_API}`);
};
const deleteAds = (id) => {
    return axios.delete(`${ADS_API}/${id}`);
};

const getAdsById = (adsId) => {
    return axios.get(`${ADS_API}/${adsId}`);
};

const updateAds = (id, data) => {
    return axios.put(`${ADS_API}/${id}`, data);
};
export {addAds, deleteAds, getAdsById, updateAds, getAllAds};