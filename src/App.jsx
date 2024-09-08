import React from "react"
import { Routes, Route } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/ReactToastify.css'
const App = () => {
  return(
    <div>
    <ToastContainer/>
    <Navbar/>
    <Routes>
        <Route path='/' element={<Home />} />
    </Routes>
    <Footer/>
   </div>
  )
}
export default App;