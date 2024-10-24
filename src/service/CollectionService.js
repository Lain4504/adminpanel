import axios from "axios";

const API_URL = "http://localhost:5146/api/collection";

// Function to get token from local storage or another method
const getToken = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user ? user.token : null;
    console.log('Retrieved Token:', token);
    return token;
};


const getAllCollections = () => {
    const token = getToken();
    return axios.get(API_URL, {
        headers: {
            'Authorization': `Bearer ${token}`,

        }
    })
        .then(response => {
            console.log('Get All Collections Response:', response);
            return response;
        })
        .catch(error => {
            console.error('Error fetching all collections:', error);
            throw error;
        });
};


const deleteCollection = (collectionId) => {
    const token = getToken();
    return axios.delete(`${API_URL}/delete/${collectionId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

const addCollection = (collection) => {
    const token = getToken();
    try {
        collection.isDisplay = Boolean(collection.isDisplay === 'true');
        return axios.post(API_URL + "/create", collection, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const getCollectionsById = (id) => {
    const token = getToken();
    return axios.get(`${API_URL}/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

const updateCollection = async (id, data) => {
    const token = getToken();
    try {
        data.isDisplay = Boolean(data.isDisplay);
        return await axios.put(`${API_URL}/update/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (err) {
        console.log(err);
        throw err;
    }
};
const removeCollectionFromBook = async (bookId, collectionId) => {
    try {
        const response = await axios.delete(`${API_URL}/${bookId}/collection/${collectionId}`);
        console.log('Response:', response.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error('Error:', error.response.data.message);
        } else {
            console.error('An error occurred:', error);
            alert('An error occurred while removing the collection.');
        }
    }
};

export { getAllCollections, deleteCollection, addCollection, getCollectionsById, updateCollection, removeCollectionFromBook };
