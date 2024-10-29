import axiosInstance from '../context/AxiosConfig'; // Adjust the path as necessary

const ACCOUNT_API = import.meta.env.VITE_API_URL + "/user";

const createAccount = (account) => {
    return axiosInstance.post(`${ACCOUNT_API}/register`, account);
};

const login = (account) => {
    return axiosInstance.post(`${ACCOUNT_API}/login`, account);
};

const googleLogin = (credential) => {
    return axiosInstance.post(`${ACCOUNT_API}/google-login`, 
        { token: credential }, 
        {
            headers: {
                'Content-Type': 'application/json', 
            }
        }
    );
};

const logout = (refreshToken) => {
    return axiosInstance.post(`${ACCOUNT_API}/logout`, { RefreshToken: refreshToken });
};

const getAllUsers = () => {
    return axiosInstance.get(ACCOUNT_API)
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
    return axiosInstance.delete(`${ACCOUNT_API}/delete/${id}`);
};

const getUserInfoByEmail = (email) => {
    return axiosInstance.get(`${ACCOUNT_API}/by-email/${email}`);
};

const getUserProfile = async (userId) => {
    return await axiosInstance.get(`${ACCOUNT_API}/get-profile/${userId}`);
};

const forgetPassword = (email) => {
    return axiosInstance.post(`${ACCOUNT_API}/forgot-password`, {
        Email: email 
    });
};

const changePassword = (token) => {
    return axiosInstance.post(`${ACCOUNT_API}/change-password`, token, {
        headers: {
            'Authorization': `Bearer ${token}` // Truyền token vào header
        }
    });
};

const updateUser = async (id, role, state) => {
    return axiosInstance.put(`${ACCOUNT_API}/update-user/${id}`, 
        { role, state }, 
        { headers: { 
            'Content-Type': 'application/json'
        } } 
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
    updateUser,
    googleLogin,
    logout
};
