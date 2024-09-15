import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import FormNew from "./components/FormNew";
import CollectionList from "./pages/collection/CollectionList";
import Order from "./pages/Order";
import Post from "./pages/Post";
// import Product from "./pages/Product";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import CollectionSingle from "./pages/collection/CollectionSingle";
import { addCollection } from "./service/CollectionService";
import { collectionInputs } from "./context/formSource";
import Login from "./pages/Login";

const App = () => {
  const location = useLocation();

  return (
    <>
      <ToastContainer />
      {location.pathname === "/login" ? (
        // Nếu trang là /login, chỉ hiển thị trang đăng nhập mà không có Sidebar hay Footer
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : (
        // Nếu không phải trang /login, hiển thị toàn bộ Sidebar, Footer và các trang khác
        <div className="p-4 sm:ml-64">
          <Sidebar />
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <div className="flex flex-col min-h-screen">
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/collections">
                    <Route index element={<CollectionList />} />
                    <Route path="new" element={<FormNew inputs={collectionInputs} title="Add New Collection" location={'/collections'} handleAdd={addCollection} />} />
                    <Route path=":id" element={<CollectionSingle />} />
                  </Route>
                  {/* <Route path="/product">
                    <Route index element={<Product />} />
                  </Route> */}
                  <Route path="/order" element={<Order />} />
                  <Route path="/post" element={<Post />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
                <Footer />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
