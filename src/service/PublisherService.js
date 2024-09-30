import axios from "axios";

const PUBLISHER_BASE_URL = "http://localhost:5146/api/publisher";

const getAllPublishers = () => {
    return axios.get(PUBLISHER_BASE_URL);
}

const deletePublisher = (publisherId) => {
    return axios.delete(PUBLISHER_BASE_URL + '/' + publisherId);
}

const addPublisher = (publisher) => {
    axios.post(PUBLISHER_BASE_URL, publisher);
}

const getPublisherById = (id) => {
    return axios.get(PUBLISHER_BASE_URL + '/' + id);
}

const updatePublisher = async (id, data) => {
    try {
        return await axios.put(`${PUBLISHER_BASE_URL}/${id}`, data);
    } catch (err) {
        console.log(err);
        throw err;
    }
}
export {getAllPublishers, deletePublisher, addPublisher, getPublisherById, updatePublisher}