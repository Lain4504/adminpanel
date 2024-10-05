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
    return axios.delete(`${API_URL}/${collectionId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

const addCollection = (collection) => {
    const token = getToken();
    try {
        collection.isDisplay = Boolean(collection.isDisplay === 'true');
        return axios.post(API_URL + "/" + "create", collection, {
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
    return axios.get(`${API_URL}/get/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

const updateCollection = async (id, data) => {
    const token = getToken();
    try {
        data.isDisplay = Boolean(data.isDisplay);
        return await axios.put(`${API_URL}/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export { getAllCollections, deleteCollection, addCollection, getCollectionsById, updateCollection };
