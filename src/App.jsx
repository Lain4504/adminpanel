import React from "react"
import { Routes, Route } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/ReactToastify.css'
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
    <ToastContainer/>
    <Sidebar/>
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/collection" element={<Collection/>} />
        <Route path="/order" element={<Order/>}/>
        <Route path="/post" element={<Post/>}/>
        <Route path="/product" element={<Product/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
    <Footer/>
   </div> </div></>
  )
}
export default App;