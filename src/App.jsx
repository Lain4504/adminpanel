import React from "react"
import { Routes, Route } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import Collection from "./pages/Collection";
import Order from "./pages/Order";
import Post from "./pages/Post";
import Product from "./pages/Product";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
const App = () => {
  return(
    <> 
    <div class="p-4 sm:ml-64">
      <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
      <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
    <ToastContainer/>
    <Sidebar/>
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="collections">
              <Route index element={<Collection />}></Route>
         </Route>
         <Route path="product">
              <Route index element={<Product />}></Route>
         </Route>
        <Route path="/order" element={<Order/>}/>
        <Route path="/post" element={<Post/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
    <Footer/>
   </div> </div></div> </div></>
  )
}
export default App;