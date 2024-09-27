import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Layout } from 'antd';
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
import { useCookies } from 'react-cookie';
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

const { Header, Sider, Content } = Layout;

const App = () => {
  const [cookies, setCookies, removeCookies] = useCookies(['authToken']);
  const location = useLocation();
  
  return (
    <>
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
              <Navbar />
            </Header>
            <Content style={{ margin: '16px' }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <Routes>
                  <Route path="/" element={<Home   />} />
                <Route path="/login" element={<Login/>}/>
                  {/* Collection Start */}
                  <Route path="/product-management/collections">
                    <Route index element={<CollectionList   />} />
                    <Route path="new" element={<FormNew inputs={collectionInputs} title="Add New Collection" location="/product-management/collections" handleAdd={addCollection}   />} />
                    <Route path=":id" element={<CollectionSingle
                      cookies={cookies}
                      setCookies={setCookies}
                      removeCookies={removeCookies}
                    />} />
                  </Route>
                  {/* Collection End */}
                  {/* Publisher Start */}
                  <Route path="/product-management/publishers">
                    <Route index element={<PublisherList   />} />
                    <Route path="new" element={<FormNew inputs={publisherInputs} title="Add New Publisher" location="/product-management/publishers" handleAdd={addPublisher}   />} />
                    <Route path=":id" element={<PublisherSingle
                      cookies={cookies}
                      setCookies={setCookies}
                      removeCookies={removeCookies}
                    />} />
                  </Route>
                  {/* Publisher End */}
                  {/* Post Start */}
                  <Route path="/post-management/posts">
                    <Route index element={<PostList   />} />
                    <Route path="new" element={<PostNew inputs={collectionInputs} title="Add New Post" location="/post-management/posts" handleAdd={createPost}   />} />
                    <Route path=":id" element={<PostSingle
                      cookies={cookies}
                      setCookies={setCookies}
                      removeCookies={removeCookies}
                    />} />
                  </Route>
                  {/* Post End */}

                  {/* Orders Start */}
                  <Route path="/order-management/orders">
                    <Route index element={<OrderList   />} />
                    <Route path=":id" element={<OrderDetail   />} />
                  </Route>
                  <Route path="/order-state/:id" element={<ChangeState />}></Route>
                  {/* Orders End */}
                  {/* Product Start */}
                  <Route path="/product-management/products">
                    <Route index element={<ProductList
                      cookies={cookies}
                      setCookies={setCookies}
                      removeCookies={removeCookies} />} />
                    <Route path="new" element={<ProductNew inputs={collectionInputs} title="Add New Product" location="/product-management/products" handleAdd={addCollection}   />} />
                    <Route path=":id" element={<ProductSingle
                      cookies={cookies}
                      setCookies={setCookies}
                      removeCookies={removeCookies}
                    />} />
                  </Route>
                  {/* Product End */}

                  <Route path="/dashboard" element={<Dashboard   />} />
                  <Route path="*" element={<Page404 />} />
                </Routes>
              </div>
            </Content>
            <Footer />
          </Layout>
        </Layout>
    </>
  );
};

export default App;
