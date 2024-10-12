import React, { useContext } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RequireAuth = ({ children }) => {
  const { currentUser, isSessionExpired } = useContext(AuthContext);
  const navigate = useNavigate();

  if (isSessionExpired) {
    message.warning("Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại.");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
    return null;
  }

  if (!currentUser) {
    message.warning("Bạn cần đăng nhập để truy cập trang này.");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
    return null;
  }

  return children;
};

export default RequireAuth;
