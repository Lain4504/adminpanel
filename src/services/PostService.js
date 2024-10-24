import axios from "axios";

const POST_API = import.meta.env.VITE_API_URL + "/post";
const POSTCATEGORY_API = import.meta.env.VITE_API_URL + "/post-category";

const getAllPosts = () => {
    return axios.get(POST_API);
};

const getPostById = (id) => {
    return axios.get(`${POST_API}/${id}`);
};

const createPost = (data) => {
    return axios.post(POST_API, data);
};

const updatePost = (id, data) => {
    return axios.put(`${POST_API}/${id}`, data);
};

const deletePost = (id) => {
    return axios.delete(`${POST_API}/${id}`);
};

const getAllPostCategories = () => {
    return axios.get(POSTCATEGORY_API);
};

const getPostCategoriesById = (id) => {
    return axios.get(`${POSTCATEGORY_API}/${id}`);
};

const updatePostCategories = async (id, data) => {
    return await axios.put(`${POSTCATEGORY_API}/${id}`, data);
};

const addPostCategory = (data) => {
    return axios.post(POSTCATEGORY_API, data);
};

const deletePostCategories = (id) => {
    return axios.delete(`${POSTCATEGORY_API}/${id}`);
};

export { 
    getAllPosts, 
    getPostById, 
    createPost, 
    updatePost, 
    deletePost, 
    getAllPostCategories, 
    getPostCategoriesById, 
    updatePostCategories, 
    deletePostCategories, 
    addPostCategory 
};
