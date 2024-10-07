import React, { useContext, useEffect, useReducer, useState } from "react";
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
import { collectionInputs, postCategoryInputs, postInputs, publisherInputs } from "./context/formSource";
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
import { addPostCategory, createPost } from "./service/PostService";
import PublisherSingle from "./pages/publisher/PublisherSingle";
import PublisherList from "./pages/publisher/PublisherList";
import { addPublisher } from "./service/PublisherService";
import { AuthContext } from "./context/AuthContext";
import PostCategorySingle from "./pages/post-category/PostCategorySingle";
import PostCategoryList from "./pages/post-category/PostCategoryList";
import { jwtDecode } from 'jwt-decode';
import OrderChart from "./chart/OrderChart";
import AuthReducer from "./context/AuthReducer";


const { Header, Sider, Content } = Layout;

const App = () => {
  const [state, dispatch] = useReducer(AuthReducer);
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
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
    const { currentUser, isSessionExpired } = useContext(AuthContext);

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
          <Sider width={250}
            style={{
              background: 'white',
              border: '2px solid #ccc',
              borderRadius: '5px'
            }}
            collapsed={collapsed}>
            <Sidebar />
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button
                type="primary"
                style={{ marginLeft: 16, background: 'white', borderColor: 'black', color: '#001529' }}
                icon={collapsed ? <MenuUnfoldOutlined style={{ color: 'black' }} /> : <MenuFoldOutlined style={{ color: 'black' }} />}
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
                    <Route path="new" element={<RequireAuth><PostNew inputs={postInputs} title="Add New Post" location="/post-management/posts" handleAdd={createPost} /></RequireAuth>} />
                    <Route path=":id" element={<RequireAuth><PostSingle /></RequireAuth>} />
                  </Route>
                  {/* Post End */}
                  {/* PostCategory Start */}
                  <Route path="/post-management/categories">
                    <Route index element={<RequireAuth><PostCategoryList /></RequireAuth>} />
                    <Route path="new" element={<RequireAuth><FormNew inputs={postCategoryInputs} title="Add New Post Category" location="/post-management/categories" handleAdd={addPostCategory} /></RequireAuth>} />
                    <Route path=":id" element={<RequireAuth><PostCategorySingle /></RequireAuth>} />
                  </Route>
                  {/* PostCategory End */}
                  {/* Orders Start */}
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
                  <Route path="/orderchart" element={<RequireAuth><OrderChart /> </RequireAuth>} />
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