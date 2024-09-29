import axios from "axios";

const ACCOUNT_URL = "http://localhost:5146/api/user/";

const createAccount = (account) => {
    return axios.post(ACCOUNT_URL + 'register', account);
}

const login = (account) => {
    return axios.post(ACCOUNT_URL + 'login', account);
}

const getAllUsers = () => {
    return axios.get(ACCOUNT_URL)
        .then(response => {
            console.log('Get All Users Response:', response);
            return response;
        })
        .catch(error => {
            console.error('Error fetching all collections:', error);
            throw error;
        });
};
const deleteUser = async (id) => {
    return axios.delete(ACCOUNT_URL +'delete/'+ id);
  };
export {createAccount, login, getAllUsers, deleteUser}

const getUserInfoByEmail = (email) => {
    return axios.get(`http://localhost:5146/api/user/by-email/${email}`);
}
export {createAccount, login, getUserInfoByEmail}
