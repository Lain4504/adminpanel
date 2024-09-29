import axios from "axios";

const API_URL = "http://localhost:5146/api/author";

const getAllAuthors = () => {
    return axios.get(API_URL);
}

export {getAllAuthors};