import React from "react"
import { Routes, Route } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/ReactToastify.css'
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";

const App = () => {
  return(
    <div>
    <ToastContainer/>
    <Sidebar/>
    <Routes>
        <Route path='/' element={<Home/>} />
    </Routes>
   </div>
  )
}
export default App;