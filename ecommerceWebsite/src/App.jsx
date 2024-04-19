import { useEffect, useState } from 'react'
import'./app.scss'
import Navbar from './components/Navbar/Navbar'
import Homepage from "./pages/Homepage/Homepage"
import SingleCategory from './pages/SingleCategory/SingleCategory'
import { Routes ,Route} from 'react-router-dom'
import Newsletter from "./components/Footer/Newsletter/Newsletter"
import Footer from "./components/Footer/Footer"
import SingleProduct from './pages/SingleProduct/SingleProduct'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Search from './pages/Search/Search'
import Checkout from './pages/Checkout/Checkout'



function App() {
 
  return (
    <>
     <Navbar/>
     <Routes>
       <Route path='/' element={<Homepage/>}/>
       <Route path="/category/:id" element={<SingleCategory/>} />
       
       <Route path="/product/:id" element={<SingleProduct/>} />
       
       <Route path='/login' element={<Login/>}/>
       <Route path="/checkout" element={<Checkout/>}/>
       <Route path='/register' element={<Register/>}/>
       <Route path='/search' element={<Search/>}/>
     </Routes>
     <Newsletter/>
     <Footer/>
    </>
  )
}

export default App
