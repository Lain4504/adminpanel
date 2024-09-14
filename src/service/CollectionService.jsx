import axios from "axios";

const API_URL = "http://localhost:5146/api/collection";

const getAllCollections = () => {
    return axios.get(API_URL)
        .then(response => {
            console.log('Get All Collections Response:', response);
            return response;
        })
        .catch(error => {
            console.error('Error fetching all collections:', error);
            throw error;
        });
};

const deleteCollection = (collectionId) => axios.delete(`${API_URL}/${collectionId}`);

const addCollection = (collection) => {
    try {
        collection.isDisplay = Boolean(collection.isDisplay === 'true');
        return axios.post(API_URL, collection);
    } catch (err) {
        console.log(err);
    }
}

const getCollectionsById = (id) => axios.get(`${API_URL}/${id}`);

const updateCollection = async (data) => {
    try {
        // Ensure isDisplay is a boolean
        data.isDisplay = Boolean(data.isDisplay);
        const response = await axios.put(API_URL, data);
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
export { getAllCollections, deleteCollection, addCollection, getCollectionsById, updateCollection };

