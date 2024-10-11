import React, { useContext, useEffect, useReducer, useState } from "react";
import { Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import { Layout, Button, message } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { AuthContext } from "./context/AuthContext";
import { jwtDecode } from 'jwt-decode';
import AuthReducer from "./context/AuthReducer";
import AppRouter from "./context/AppRouter";
import ScrollToTop from "./components/ScrollToTop";

const { Header, Sider, Content, Footer } = Layout;

const App = () => {
  const [state, dispatch] = useReducer(AuthReducer);
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 768); 
  const navigate = useNavigate();
  const handleToggleSidebar = () => {
    // Chỉ cho phép chuyển đổi khi không phải trên kích thước md trở xuống
    if (window.innerWidth > 768) {
      setCollapsed(!collapsed);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true); // Luôn đóng sidebar khi màn hình nhỏ hơn md
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    if (currentUser) {
      console.log("Token:", currentUser.token);
      try {
        const decodedToken = jwtDecode(currentUser.token);
        console.log("Decoded Token:", decodedToken);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      console.log("Không có người dùng hiện tại");
    }
  }, [currentUser]);
  const isLoginPage = location.pathname === "/login";

  useEffect(() => {
    console.log("Test user", currentUser)
    if (currentUser && isLoginPage) {
      navigate("/");
    }
  }, [currentUser, isLoginPage, navigate]);

  useEffect(() => {
    const checkToken = () => {
      if (currentUser) {
        // Kiểm tra xem token đã hết hạn chưa
        const decodedToken = jwtDecode(currentUser.token);
        const isExpired = decodedToken.exp * 1000 < Date.now(); // Thời gian hết hạn

        if (isExpired) {
          dispatch({ type: "LOGOUT", isSessionExpired: true });
          navigate("/login");
        }
      }
    };
    checkToken();
  }, [currentUser, navigate, dispatch]);
  
  return (
    <>
      {isLoginPage ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <Layout style={{ minHeight: '100vh' }}>
        <Sider
          width={250}
          style={{
            background: 'white',
            position: 'fixed', // Giữ sidebar cố định
            height: '100%', // Đảm bảo chiều cao đầy đủ
          }}
          collapsed={collapsed}
        >
          <Sidebar />
        </Sider>
        <Layout style={{ marginLeft: collapsed ? 80 : 250 }}> {/* Căn chỉnh margin cho content */}
          <Header style={{ background: '#fff', padding: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
              type="primary"
              style={{ marginLeft: 16, background: 'white', borderColor: 'black', color: '#001529' }}
              icon={collapsed ? <MenuUnfoldOutlined style={{ color: 'black' }} /> : <MenuFoldOutlined style={{ color: 'black' }} />}
              onClick={handleToggleSidebar}
              className={collapsed ? "menu-toggle" : ""}
            />
            <Navbar />
          </Header>
          <Content style={{ margin: '16px' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <AppRouter />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center', background: 'white' }}>
          Copyright 2024 @ Book Store - All Rights Reserved
            </Footer>
        </Layout>
      </Layout>
      )}
      <ScrollToTop/>
    </>
  );
};

export default App;