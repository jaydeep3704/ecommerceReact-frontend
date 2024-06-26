import React, { useEffect, useState } from "react";
import "./navbar.scss";
import { FiShoppingCart, FiSearch } from "react-icons/fi";

import { MdOutlineDarkMode } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Cart from "../Cart/Cart";
import Logout from "../Logout/Logout";
import { useSelector } from "react-redux";
import { userLoggedIn } from "../../features/products/authSlice";
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
const Navbar = () => {
   const dispatch=useDispatch()
   const navigate=useNavigate()
  const linkStyle = {
    textDecoration: "none",
    color: "white",
  };
  const [scrolled, setScrolled] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const loggedIn=useSelector((state)=>state.auth.isLoggedIn)
  const totalCartItems=useSelector((state)=>state.cart.cart_items).length
  const handleScroll = () => {
    const offset = window.scrollY;

    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };



  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
   
   

  }, []);

  const openCart = () => {
    if(loggedIn)
    { 
    setShowCart((prev) => !prev);
    console.log(showCart);
    }
    else{
        alert("Login To add Items to Cart")
    }
  };

  return (
    <>
      <div className={`navbar ${scrolled ? "stickynav" : ""}`}>
        <div className="nav-container">
          <div className="left">
            <span>Tech</span>time
          </div>
          <div className="center">
            <ul>
              <Link to="/" style={linkStyle}>
                <li>Home</li>
              </Link>
              <li>About</li>
              <li>Categories</li>
            </ul>
          </div>
          <div className="right">
            
            {  useSelector((state)=>state.auth.isLoggedIn)?<Logout />:<Link to={'/login'} style={linkStyle}>Login</Link>}
            <FaUserAlt style={{fontSize:"3.5rem"}}/>
            <MdOutlineDarkMode style={{fontSize:"3.5rem"}}/>
            <div className="search" onClick={()=>navigate('/search')}>
              <FiSearch />
            </div>
            <div className="cart" onClick={openCart}>
              <FiShoppingCart />
              <span>{totalCartItems}</span>
            </div>
          </div>
        </div>
      </div>
      {showCart && <Cart setShowCart={setShowCart} />}
    </>
  );
};

export default Navbar;
