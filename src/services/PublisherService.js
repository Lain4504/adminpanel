import axiosInstance from "../context/AxiosConfig"; // Adjust the path as necessary

const PUBLISHER_API = import.meta.env.VITE_API_URL + "/publisher";

const getAllPublishers = () => {
    return axiosInstance.get(PUBLISHER_API);
};

const deletePublisher = (publisherId) => {
    return axiosInstance.delete(`${PUBLISHER_API}/${publisherId}`);
};

const addPublisher = (publisher) => {
    return axiosInstance.post(PUBLISHER_API, publisher);
};

const getPublisherById = (id) => {
    return axiosInstance.get(`${PUBLISHER_API}/${id}`);
};

const updatePublisher = async (id, data) => {
    try {
        return await axiosInstance.put(`${PUBLISHER_API}/${id}`, data);
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export { 
    getAllPublishers, 
    deletePublisher, 
    addPublisher, 
    getPublisherById, 
    updatePublisher 
};
