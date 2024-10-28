import axios from "axios";

const ACCOUNT_API = import.meta.env.VITE_API_URL + "/user";

const createAccount = (account) => {
    return axios.post(`${ACCOUNT_API}/register`, account);
};

const login = (account) => {
    return axios.post(`${ACCOUNT_API}/login`, account);
};

const getAllUsers = () => {
    return axios.get(ACCOUNT_API)
        .then(response => {
            console.log('Get All Users Response:', response);
            return response;
        })
        .catch(error => {
            console.error('Error fetching all users:', error);
            throw error;
        });
};

const deleteUser = async (id) => {
    return axios.delete(`${ACCOUNT_API}/delete/${id}`);
};

const getUserInfoByEmail = (email) => {
    return axios.get(`https://localhost:3001/api/user/by-email/${email}`);
};

const getUserProfile = async (userId) => {
    return await axios.get(`${ACCOUNT_API}/get-profile/${userId}`);
};

const forgetPassword = (email) => {
    return axios.post(`${ACCOUNT_API}/forgot-password`, {
        Email: email 
    });
};
const changePassword = (token) => {
    return axios.post(`${ACCOUNT_API}/change-password`, token, {
        headers: {
            'Authorization': `Bearer ${token}` // Truyền token vào header
        }
    });
};
const updateUser = async (id, role, state) => {
    return axios.put(`${ACCOUNT_API}/update-user/${id}`, 
        { role, state }, 
        { headers: { 'Content-Type': 'application/json' } } // Đặt Content-Type ở đây
    );
};

export {
    getUserProfile,
    createAccount,
    login,
    getAllUsers,
    deleteUser,
    getUserInfoByEmail,
    forgetPassword,
    changePassword,
    updateUser
};
