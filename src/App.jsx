import React, { useContext } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Layout } from 'antd';
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import FormNew from "./components/FormNew";
import CollectionList from "./pages/collection/CollectionList";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import CollectionSingle from "./pages/collection/CollectionSingle";
import { addCollection } from "./service/CollectionService";
import { collectionInputs, postCategoryInputs, publisherInputs } from "./context/formSource";
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


const { Header, Sider, Content } = Layout;

const App = () => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to={"/login"} />;
  };

  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {isLoginPage ? (
        // Chỉ hiển thị trang đăng nhập khi ở trang login
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            width={250}
            style={{ background: '#001529' }}
            breakpoint="lg"
            collapsedWidth="0"
          >
            <Sidebar />
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Navbar />
            </Header>
            <Content style={{ margin: '16px' }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <Routes>
                  <Route index element={<RequireAuth><Home /></RequireAuth>} />
                  {/* Collection Start */}
                  <Route path="/product-management/collections">
                    <Route index element={<RequireAuth><CollectionList /></RequireAuth>} />
                    <Route path="new" element={<RequireAuth><FormNew inputs={collectionInputs} title="Add New Collection" location="/product-management/collections" handleAdd={addCollection} /></RequireAuth>} />
                    <Route path=":id" element={<RequireAuth><CollectionSingle /></RequireAuth>} />
                  </Route>
                  {/* Collection End */}
                  {/* Publisher Start */}
                  <Route path="/product-management/publishers">
                    <Route index element={<RequireAuth><PublisherList /></RequireAuth>} />
                    <Route path="new" element={<RequireAuth><FormNew inputs={publisherInputs} title="Add New Publisher" location="/product-management/publishers" handleAdd={addPublisher} /></RequireAuth>} />
                    <Route path=":id" element={<RequireAuth><PublisherSingle /></RequireAuth>} />
                  </Route>
                  {/* Publisher End */}
                  {/* Post Start */}
                  <Route path="/post-management/posts">
                    <Route index element={<RequireAuth><PostList /></RequireAuth>} />
                    <Route path="new" element={<RequireAuth><PostNew inputs={collectionInputs} title="Add New Post" location="/post-management/posts" handleAdd={createPost} /></RequireAuth>} />
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
                  {/* Orders End */}
                  {/* Product Start */}
                  <Route path="/product-management/products">
                    <Route index element={<RequireAuth><ProductList /></RequireAuth>} />
                    <Route path="new" element={<RequireAuth><ProductNew inputs={collectionInputs} title="Add New Product" location="/product-management/products" handleAdd={addCollection} /></RequireAuth>} />
                    <Route path=":id" element={<RequireAuth><ProductSingle /></RequireAuth>} />
                  </Route>
                  {/* Product End */}
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
