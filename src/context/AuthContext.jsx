import { createContext, useEffect, useReducer, useState } from "react";
import AuthReducer from "./AuthReducer";
import { jwtDecode } from 'jwt-decode';
import { message } from 'antd';

const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const [hasShownMessage, setHasShownMessage] = useState(false); // Biến để kiểm tra thông báo
  const [redirecting, setRedirecting] = useState(false); // Biến để kiểm tra đang chuyển hướng

  // Kiểm tra token và quản lý trạng thái đăng nhập
  useEffect(() => {
    const checkTokenExpiration = () => {
      const user = state.currentUser;
      if (user && user.token) {
        try {
          const decodedToken = jwtDecode(user.token);
          const currentTime = Date.now() / 1000;

          // Kiểm tra xem token đã hết hạn chưa
          if (decodedToken.exp < currentTime) {
            dispatch({ type: "LOGOUT" });
            if (!hasShownMessage) {
              message.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
              setHasShownMessage(true);
            }
            // Tránh việc chuyển hướng liên tục
            if (!redirecting) {
              setRedirecting(true);
              setTimeout(() => {
                window.location.href = '/login'; 
              }, 2000); 
            }
          }
        } catch (error) {
          console.error("Token không hợp lệ", error);
          dispatch({ type: "LOGOUT" });
          if (!hasShownMessage) {
            message.error("Token không hợp lệ. Vui lòng đăng nhập lại.");
            setHasShownMessage(true);
          }
          // Tránh việc chuyển hướng liên tục
          if (!redirecting) {
            setRedirecting(true);
            setTimeout(() => {
              window.location.href = '/login'; // Điều hướng đến trang đăng nhập
            }, 2000); // Thay đổi delay theo nhu cầu
          }
        }
      }
    };

    checkTokenExpiration(); // Gọi hàm kiểm tra khi trạng thái cập nhật

    // Lưu token vào localStorage khi currentUser thay đổi
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser, hasShownMessage, redirecting]);

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
