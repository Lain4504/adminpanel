import axios from "axios";

const API_URL = "http://localhost:5146/api/post";

const getToken = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user ? user.token : null;
    console.log('Retrieved Token:', token);
    return token; 
};

const getAllPosts = () => {
    return axios.get(API_URL);
}

const getPostById = (id) => {
    return axios.get(API_URL + '/' + id);
}

const createPost = (data) => {
    data.CreatedAt = new Date().toISOString().slice(0, 19);
    return axios.post(API_URL, data)
}

const updatePost = (data) => {
    return axios.put(API_URL, data);
}

const deletePost = (id) => {
    return axios.delete(API_URL + '/' + id);
}

const getAllPostCategories = () => {
    {
        const token = getToken();
        return axios.get("http://localhost:5146/api/post-category", {
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
}

const getPostCategoriesById = (id) => axios.get("http://localhost:5146/api/post-category" + '/' + id);

const updatePostCategories = async (id, data)  => {
    return await axios.put("http://localhost:5146/api/post-category" + '/' + id, data);
}

const deletePostCategories = (id) => {
    return axios.delete("http://localhost:5146/api/post-category" + '/' + id)
}
const addPostCategory = (postCategory) => {
    const token = getToken();
    try {
        return axios.post("http://localhost:5146/api/post-category", postCategory, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export { getAllPosts, getPostById, createPost, updatePost, deletePost, getAllPostCategories,getPostCategoriesById, updatePostCategories, deletePostCategories, addPostCategory}