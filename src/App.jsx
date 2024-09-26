import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Layout } from 'antd';
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import FormNew from "./components/FormNew";
import CollectionList from "./pages/collection/CollectionList";
import Order from "./pages/Order";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import CollectionSingle from "./pages/collection/CollectionSingle";
import { addCollection } from "./service/CollectionService";
import { collectionInputs } from "./context/formSource";
import Login from "./pages/Login";
import Page404 from "./components/Page404";
import ProductList from "./pages/product/ProductList";
import { useCookies } from 'react-cookie';
import PostList from "./pages/post/PostList";
import PostNew from "./pages/post/PostNew";
import PostSingle from "./pages/post/PostSingle";
import ProductNew from "./pages/product/ProductNew";
import ProductSingle from "./pages/product/ProductSingle";
import Navbar from "./components/Navbar";

const { Header, Sider, Content } = Layout;

const App = () => {
  const [cookies, setCookies, removeCookies] = useCookies(['authToken']);
  const location = useLocation();
  const handleLogout = () => {
    removeCookies('authToken');
    // Điều hướng về trang đăng nhập hoặc trang chính
    navigate('/login');
  };
  return (
    <>
      {location.pathname === "/login" ? (
        <Routes>
          <Route path="/login" element={<Login setCookies={setCookies} />} />
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
              {/* Add a header component */}
              <Navbar onLogout={handleLogout} />
            </Header>
            <Content style={{ margin: '16px' }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <Routes>
                  <Route path="/" element={<Home cookies={cookies} setCookies={setCookies} removeCookies={removeCookies} />} />
                  
                  {/* Collection Start */}
                  <Route path="/product-management/collections">
                    <Route index element={<CollectionList cookies={cookies} setCookies={setCookies} removeCookies={removeCookies} />} />
                    <Route path="new" element={<FormNew inputs={collectionInputs} title="Add New Collection" location="/product-management/collections" handleAdd={addCollection} cookies={cookies} setCookies={setCookies} removeCookies={removeCookies} />} />
                    <Route path=":id" element={<CollectionSingle 
                      cookies={cookies} 
                      setCookies={setCookies} 
                      removeCookies={removeCookies} 
                    />} />
                  </Route>
                  {/* Collection End */}

                 {/* Post Start */}
                 <Route path="/post-management/posts">
                  <Route index element={<PostList cookies={cookies} setCookies={setCookies} removeCookies={removeCookies} />} />
                  <Route path="new" element={<PostNew inputs={collectionInputs} title="Add New Post" location="/post-management/posts" handleAdd={addCollection} cookies={cookies} setCookies={setCookies} removeCookies={removeCookies} />} />
                  <Route path=":id" element={<PostSingle
                    cookies={cookies} 
                    setCookies={setCookies} 
                    removeCookies={removeCookies} 
                  />} />
                </Route>
                  {/* Post End */}

                <Route path="/order" element={<Order 
                  cookies={cookies} 
                  setCookies={setCookies} 
                  removeCookies={removeCookies} 
                />} />
                {/* Product End */}
                <Route path="/product-management/products">
                  <Route index element={<ProductList 
                    cookies={cookies} 
                    setCookies={setCookies} 
                    removeCookies={removeCookies}/>}/>
                  <Route path="new" element={<ProductNew inputs={collectionInputs} title="Add New Product" location="/product-management/products" handleAdd={addCollection} cookies={cookies} setCookies={setCookies} removeCookies={removeCookies} />} />
                  <Route path=":id" element={<ProductSingle 
                    cookies={cookies} 
                    setCookies={setCookies} 
                    removeCookies={removeCookies} 
                  />} />
                </Route>
                {/* Post End */}

                  <Route path="/dashboard" element={<Dashboard cookies={cookies} setCookies={setCookies} removeCookies={removeCookies} />} />
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
