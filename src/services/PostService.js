import axiosInstance from '../context/AxiosConfig';

const POST_API = import.meta.env.VITE_API_URL + "/post";
const POSTCATEGORY_API = import.meta.env.VITE_API_URL + "/post-category";

const getAllPosts = () => {
    return axiosInstance.get(POST_API);
};

const getPostById = (id) => {
    return axiosInstance.get(`${POST_API}/${id}`);
};

const createPost = (data) => {
    return axiosInstance.post(POST_API, data);
};

const updatePost = (id, data) => {
    return axiosInstance.put(`${POST_API}/${id}`, data);
};

const deletePost = (id) => {
    return axiosInstance.delete(`${POST_API}/${id}`);
};

const getAllPostCategories = () => {
    return axiosInstance.get(POSTCATEGORY_API);
};

const getPostCategoriesById = (id) => {
    return axiosInstance.get(`${POSTCATEGORY_API}/${id}`);
};

const updatePostCategories = async (id, data) => {
    return await axiosInstance.put(`${POSTCATEGORY_API}/${id}`, data);
};

const addPostCategory = (data) => {
    return axiosInstance.post(POSTCATEGORY_API, data);
};

const deletePostCategories = (id) => {
    return axiosInstance.delete(`${POSTCATEGORY_API}/${id}`);
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
