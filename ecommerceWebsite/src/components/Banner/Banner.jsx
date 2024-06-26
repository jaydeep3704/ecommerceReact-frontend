import React from 'react'
import './banner.scss'
import headPhones from "../../assets/headPhones.png"
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
const Banner = () => {
  const navigate=useNavigate()
  return (
    <div className="banner">
        <div className="content">
         
            <div className="text-content">
                <h1>Get the best product <br /> at your home</h1>
                
                <div className="ctas">
                    <div className="banner-cta">Read More</div>
                    <div className="banner-cta v2" onClick={()=>navigate("product/17")}>Shop Now</div>
                </div>
            </div>
            <img src={headPhones} alt=""  />
        </div>
    </div>
  )
}

export default Banner
