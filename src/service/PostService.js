import axios from "axios";

const API_URL = "http://localhost:5146/api/post";

const getAllPosts = () => {
    return axios.get(API_URL);
}

const getPostById = (id) => {
    return axios.get(API_URL + '/' + id);
}

const createPost = (data) => {
    return axios.post(API_URL, data);
}

const updatePost = (id, data) => {
    return axios.put(`${API_URL}/${id}`, data);
}

const deletePost = (id) => {
    return axios.delete(API_URL + '/' + id);
}

const getAllPostCategories = () => {
    return axios.get("http://localhost:5146/api/post-category");
}

const getPostCategoriesById = (id) => axios.get("http://localhost:5146/api/post-category" + '/' + id);

const updatePostCategories = async (id, data)  => {
    return await axios.put("http://localhost:5146/api/post-category" + '/' + id, data);
}
const addPostCategory = (data) =>{
    return axios.post("http://localhost:5146/api/post-category", data);
}
const deletePostCategories = (id) => {
    return axios.delete("http://localhost:5146/api/post-category" + '/' + id)
}

export { getAllPosts, getPostById, createPost, updatePost, deletePost, getAllPostCategories,getPostCategoriesById, updatePostCategories, deletePostCategories, addPostCategory}