import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
  isSessionExpired: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const navigate = useNavigate();

  const checkAndRefreshToken = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
if (user) {
    console.log("User data from localStorage on refresh:", user);
    const { token, refreshToken, expirationTime, refreshExpirationTime, userId } = user;
    console.log("Token:", token);
    console.log("Refresh Token:", refreshToken);
    console.log("Expiration Time:", expirationTime);
    console.log("Refresh Expiration Time:", refreshExpirationTime);
    console.log("User ID:", userId);
} else {
    console.error("User data is missing in localStorage.");
}


    const token = user.token;
    const refreshToken = user.refreshToken;
    const refreshExpirationDate = new Date(user.refreshExpirationTime); // Chuyển đổi từ chuỗi ISO thành Date
    console.log("Before arsed refreshExpirationTime:", user.refreshExpirationTime);
    console.log("Parsed refreshExpirationTime:", refreshExpirationDate);
    // Kiểm tra xem refresh token đã hết hạn chưa
    if (new Date() >= refreshExpirationDate) {
      console.error("Refresh token đã hết hạn.");
      await logout(refreshToken); // Đăng xuất nếu refresh token hết hạn
      return null;
    }

    // Kiểm tra xem token đã hết hạn chưa
    const expirationDate = new Date(user.expirationTime);
    if (new Date() >= expirationDate) {
      try {
        const response = await axios.post('https://localhost:3001/api/user/refresh-token', { refreshToken });
        const newToken = response.data.token;
       

        if (!newToken) {
          console.error("Không có token mới được trả về từ server.");
          return null;
        }

        const decodedToken = jwtDecode(newToken);
        const newExpirationTime = new Date(decodedToken.exp * 1000);

        const updatedUser = {
          ...user,
          token: newToken,
          expirationTime: newExpirationTime,
          refreshToken: refreshToken, // Cập nhật refresh token mới
          refreshExpirationTime: refreshExpirationDate // Cập nhật expirationDate của refresh token
        };

        dispatch({ type: "LOGIN", payload: updatedUser });
        localStorage.setItem("user", JSON.stringify(updatedUser));

        return updatedUser;
      } catch (error) {
        handleError(error, refreshToken); // Tách riêng hàm xử lý lỗi
        return null;
      }
    }

    return user; 
  };

  const handleError = async (error, refreshToken) => {
    if (error.response) {
      console.error('Lỗi từ server:', error.response.data);
      console.error('Mã trạng thái:', error.response.status);
    } else {
      console.error('Lỗi không xác định:', error.message);
    }

    // Gọi hàm logout để xóa refresh token trên server
    await logout(refreshToken);
  };

  const logout = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const refreshToken = user?.refreshToken;

    if (refreshToken) {
      try {
        await axios.post('https://localhost:3001/api/user/logout', { refreshToken });
        console.log("Đăng xuất thành công");
      } catch (error) {
        console.error("Lỗi khi gọi API logout:", error);
      }
    }

    dispatch({ type: "LOGOUT", isSessionExpired: true });
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
          console.log("Nhận mã lỗi 401 - Bắt đầu làm mới token...");

          originalRequest._retry = true;
          try {
            const user = await checkAndRefreshToken();

            if (user) {
              console.log("Token mới đã được làm mới, thử lại yêu cầu ban đầu...");
              originalRequest.headers['Authorization'] = `Bearer ${user.token}`;
              return axios(originalRequest);
            } else {
              console.error("Lỗi khi làm mới token, không có user mới.");
              return Promise.reject(error);
            }
          } catch (refreshError) {
            console.error("Lỗi khi làm mới token:", refreshError);
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [dispatch, navigate]);

  useEffect(() => {
    const checkToken = async () => {
      if (state.currentUser) {
        const token = state.currentUser.token;

        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const expirationDate = new Date(payload.exp * 1000);

          if (expirationDate < new Date()) {
            console.log("Token đã hết hạn - Thoát phiên...");
            const user = await checkAndRefreshToken();

            if (user) {
              dispatch({ type: "LOGIN", payload: user });
            }
          }
        }

        // Cập nhật thông tin người dùng trong localStorage
        localStorage.setItem("user", JSON.stringify(state.currentUser));
        console.log("Người dùng cập nhật:", state.currentUser);
      }
    };

    checkToken();
  }, [state.currentUser, dispatch, navigate]);

  return (
    <AuthContext.Provider value={{
      currentUser: state.currentUser,
      userId: state.currentUser?.userId,
      isSessionExpired: state.isSessionExpired,
      dispatch
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
