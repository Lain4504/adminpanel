import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import FormNew from "./components/FormNew";
import CollectionList from "./pages/collection/CollectionList";
import Order from "./pages/Order";
import Post from "./pages/Post";
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
import PostSingle from "./pages/post/PostSingle"
const App = () => {
  const [cookies, setCookies, removeCookies] = useCookies(['authToken']);
  const location = useLocation();

  return (
    <>
    {location.pathname === "/login" ? (
      <Routes>
        <Route path="/login" element={<Login setCookies={setCookies} />} />
      </Routes>
    ) : (
      <div className="p-4 sm:ml-64">
        <Sidebar />
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700">
          <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
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
               
                <Route path="product-management/products">
                  <Route index element={<ProductList 
                    cookies={cookies} 
                    setCookies={setCookies} 
                    removeCookies={removeCookies} 
                  />} />
                </Route>
                <Route path="/dashboard" element={<Dashboard 
                  cookies={cookies} 
                  setCookies={setCookies} 
                  removeCookies={removeCookies} 
                />} />
                {/* Catch-all route for 404 page */}
                <Route path="*" element={<Page404 />} />
              </Routes>
            </div>
          </div>
        </div> 
        <Footer />
      </div>
      
    )}
  </>
  );
};

export default App;
