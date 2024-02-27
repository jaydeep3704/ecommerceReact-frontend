import { useState } from 'react'

import'./app.scss'
import Navbar from "./components/Navbar/Navbar"
import Homepage from "./pages/Homepage/Homepage"
import SingleCategory from './pages/SingleCategory/SingleCategory'
import { Routes ,Route} from 'react-router-dom'
import Newsletter from "./components/Footer/Newsletter/Newsletter"
import Footer from "./components/Footer/Footer"
import SingleProduct from './pages/SingleProduct/SingleProduct'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navbar/>
     <Routes>
       <Route path='/' element={<Homepage/>}/>
       <Route path="/category/:id" element={<SingleCategory />} />
       <Route path="/product/:id" element={<SingleProduct/>} />
     </Routes>
     <Newsletter/>
     <Footer/>
    </>
  )
}

export default App
