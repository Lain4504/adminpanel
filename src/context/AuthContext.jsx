import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
  isSessionExpired: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) {
          console.log("Nhận mã lỗi 401 - Thoát phiên...");
          dispatch({ type: "LOGOUT", isSessionExpired: true }); // Logout do hết hạn
        }
        return Promise.reject(error);
      }
    );
  
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, isSessionExpired: state.isSessionExpired, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
