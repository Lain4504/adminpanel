import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import { Layout, Button, message } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import FormNew from "./components/FormNew";
import CollectionList from "./pages/collection/CollectionList";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import CollectionSingle from "./pages/collection/CollectionSingle";
import { addCollection } from "./service/CollectionService";
import { collectionInputs, publisherInputs } from "./context/formSource";
import Login from "./pages/Login";
import Page404 from "./components/Page404";
import ProductList from "./pages/product/ProductList";
import UserList from "./pages/user/UserList";
import PostList from "./pages/post/PostList";
import PostNew from "./pages/post/PostNew";
import PostSingle from "./pages/post/PostSingle";
import ProductNew from "./pages/product/ProductNew";
import ProductSingle from "./pages/product/ProductSingle";
import Navbar from "./components/Navbar";
import OrderList from "./pages/order/OrderList";
import OrderDetail from "./pages/order/OrderDetail";
import ChangeState from "./pages/order/ChangeState";
import { createPost } from "./service/PostService";
import PublisherSingle from "./pages/publisher/PublisherSingle";
import PublisherList from "./pages/publisher/PublisherList";
import { addPublisher } from "./service/PublisherService";
import { AuthContext } from "./context/AuthContext";
import { jwtDecode } from 'jwt-decode';

const { Header, Sider, Content } = Layout;

const App = () => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false); // New state for session expiration
  const navigate = useNavigate();

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

  const RequireAuth = ({ children }) => {
    if (sessionExpired) {
      // Nếu phiên đã hết hạn, không chuyển hướng ngay lập tức
      return null; // Không render gì cả
    }
    
    // Nếu không có currentUser, hiển thị thông báo và chuyển hướng
    if (!currentUser) {
      message.warning("Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại.");
      setTimeout(() => {
        navigate("/login");
      }, 3000); // Chuyển hướng sau 3 giây
      return null; // Không render gì cả
    }
    
    return children; // Render children nếu có currentUser
  };

  const isLoginPage = location.pathname === "/login";

  useEffect(() => {
    if (currentUser && isLoginPage) {
      navigate("/");
      message.info("Bạn đã được chuyển hướng đến trang chính...");
    }
  }, [currentUser, isLoginPage, navigate]);

 // Check for session expiration and redirect if needed

// Kiểm tra sessionExpiration
useEffect(() => {
  if (sessionExpired) {
    // Nếu sessionExpired là true, hiển thị thông báo cảnh báo
    message.warning("Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại.");
    
    // Chờ 3 giây trước khi chuyển hướng
    const timeoutId = setTimeout(() => {
      navigate("/login");
    }, 1500); // Redirect after 1.5 seconds

    // Dọn dẹp khi component bị unmount hoặc sessionExpired thay đổi
    return () => clearTimeout(timeoutId);
  }
}, [sessionExpired, navigate]);

  return (
    <>
      {isLoginPage ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider width={250} style={{ background: '#001529' }} collapsed={collapsed}>
            <Sidebar />
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button
                type="primary"
                style={{ marginLeft: 16, background: 'black', borderColor: 'black', color: '#001529' }}
                icon={collapsed ? <MenuUnfoldOutlined style={{ color: 'white' }} /> : <MenuFoldOutlined style={{ color: 'white' }} />}
                onClick={() => setCollapsed(!collapsed)}
              />
              <Navbar />
            </Header>
            <Content style={{ margin: '16px' }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <Routes>
                  <Route index element={<RequireAuth><Home /></RequireAuth>} />
                  {/* Collection Routes */}
                  <Route path="/product-management/collections">
                    <Route index element={<RequireAuth><CollectionList /></RequireAuth>} />
                    <Route path="new" element={<RequireAuth><FormNew inputs={collectionInputs} title="Add New Collection" location="/product-management/collections" handleAdd={addCollection} /></RequireAuth>} />
                    <Route path=":id" element={<RequireAuth><CollectionSingle /></RequireAuth>} />
                  </Route>
                  {/* Publisher Routes */}
                  <Route path="/product-management/publishers">
                    <Route index element={<RequireAuth><PublisherList /></RequireAuth>} />
                    <Route path="new" element={<RequireAuth><FormNew inputs={publisherInputs} title="Add New Publisher" location="/product-management/publishers" handleAdd={addPublisher} /></RequireAuth>} />
                    <Route path=":id" element={<RequireAuth><PublisherSingle /></RequireAuth>} />
                  </Route>
                  {/* Post Routes */}
                  <Route path="/post-management/posts">
                    <Route index element={<RequireAuth><PostList /></RequireAuth>} />
                    <Route path="new" element={<RequireAuth><PostNew inputs={collectionInputs} title="Add New Post" location="/post-management/posts" handleAdd={createPost} /></RequireAuth>} />
                    <Route path=":id" element={<RequireAuth><PostSingle /></RequireAuth>} />
                  </Route>
                  {/* Orders Routes */}
                  <Route path="/order-management/orders">
                    <Route index element={<RequireAuth><OrderList /></RequireAuth>} />
                    <Route path=":id" element={<RequireAuth><OrderDetail /></RequireAuth>} />
                  </Route>
                  <Route path="/order-state/:id" element={<RequireAuth><ChangeState /></RequireAuth>} />
                  {/* Product Routes */}
                  <Route path="/product-management/products">
                    <Route index element={<RequireAuth><ProductList /></RequireAuth>} />
                    <Route path="new" element={<RequireAuth><ProductNew inputs={collectionInputs} title="Add New Product" location="/product-management/products" handleAdd={addCollection} /></RequireAuth>} />
                    <Route path=":id" element={<RequireAuth><ProductSingle /></RequireAuth>} />
                  </Route>
                  <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
                  <Route path="/user-management/users" element={<RequireAuth><UserList /></RequireAuth>} />
                  <Route path="*" element={<Page404 />} />
                </Routes>
              </div>
            </Content>
            <Footer />
          </Layout>
        </Layout>
      )}
    </>
  );
};

export default App;
