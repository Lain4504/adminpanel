import axios from "axios";

const API_URL = "http://localhost:5146/api/slider";

const getAllSliders = () => {
    return axios.get(API_URL);
}


export {getAllSliders};