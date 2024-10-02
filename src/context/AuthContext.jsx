import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import { message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const navigate = useNavigate(); // Get the navigate function

  // Set up an Axios interceptor for handling 401 responses
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) {
          dispatch({ type: "LOGOUT" });
          const error401 = "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.";
          message.error(error401); // Show error message
          navigate('/login', { state: { message: error401 } }); // Redirect to login with state
        }
        return Promise.reject(error);
      }
    );

    // Clean up the interceptor when the component unmounts
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [dispatch, navigate]);

  useEffect(() => {
    // Lưu currentUser vào localStorage khi có sự thay đổi
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
