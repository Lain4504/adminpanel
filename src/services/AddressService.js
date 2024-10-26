import axios from "axios";

const ADDRESS_API = "https://provinces.open-api.vn/api";

const getProvince = () => {
    return axios.get(`${ADDRESS_API}/p/`);
}

const getDistrict = (id) => {
    if (!id) return Promise.reject(new Error("District ID is required"));
    return axios.get(`${ADDRESS_API}/p/${id}/?depth=2`);
}

const getWard = (id) => {
    if (!id) return Promise.reject(new Error("Ward ID is required"));
    return axios.get(`${ADDRESS_API}/d/${id}/?depth=2`);
}

const getDistrictById = async (id) => {
    if (!id) return Promise.reject(new Error("District ID is required"));
    try {
        const response = await axios.get(`${ADDRESS_API}/d/${id}`);
        return response.data.name;
    } catch (error) {
        console.error("Error fetching district by ID:", error);
        throw error;
    }
}

const getWardById = async (id) => {
    if (!id) return Promise.reject(new Error("Ward ID is required"));
    try {
        const response = await axios.get(`${ADDRESS_API}/w/${id}`);
        return response.data.name;
    } catch (error) {
        console.error("Error fetching ward by ID:", error);
        throw error;
    }
}

const getProvinceById = async (id) => {
    if (!id) return Promise.reject(new Error("Province ID is required"));
    try {
        const response = await axios.get(`${ADDRESS_API}/p/${id}`);
        return response.data.name;
    } catch (error) {
        console.error("Error fetching province by ID:", error);
        throw error;
    }
}

export {
    getProvince,
    getDistrict,
    getWard,
    getDistrictById,
    getWardById,
    getProvinceById
};
