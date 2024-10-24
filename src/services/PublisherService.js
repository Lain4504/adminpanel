import axios from "axios";

const PUBLISHER_API = import.meta.env.VITE_API_URL + "/publisher";

const getAllPublishers = () => {
    return axios.get(PUBLISHER_API);
};

const deletePublisher = (publisherId) => {
    return axios.delete(`${PUBLISHER_API}/${publisherId}`);
};

const addPublisher = (publisher) => {
    return axios.post(PUBLISHER_API, publisher);
};

const getPublisherById = (id) => {
    return axios.get(`${PUBLISHER_API}/${id}`);
};

const updatePublisher = async (id, data) => {
    try {
        return await axios.put(`${PUBLISHER_API}/${id}`, data);
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
