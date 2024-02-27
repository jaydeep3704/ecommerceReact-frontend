import React from 'react'
import './footer.scss'
import { FaLocationArrow } from "react-icons/fa";
import { IoIosPhonePortrait } from "react-icons/io";
import { MdEmail } from "react-icons/md";
const Footer = () => {
  return (
    <>
    <div className='footer'>
      <div className="footer-sections">
          <div className="footer-section">
            <h3>About</h3>
            <p>At TechTime, we are more than just an e-commerce platform; we are a team of tech enthusiasts committed to bringing you the most cutting-edge and revolutionary electronic devices. Our mission is to provide a curated selection of top-tier products, ensuring that you stay ahead in the ever-evolving landscape of technology.</p>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
             <ul>
                <li><FaLocationArrow/>Bharati Vidyapeeth,College of engineering khargar</li>
                <li><MdEmail/>bvcoein@gmail.com</li>
                <li><IoIosPhonePortrait/>91+ 787 787 7878</li>

             </ul>
          </div>
          <div className="footer-section">
            <h3>Categories</h3>
             <li>Headphones</li>
             <li>Smartwatches</li>
             <li>Bluetooth Speakers</li>
             <li>Wireless Earbuds</li>
             <li>Laptop</li>
          </div>
          <div className="footer-section">
            <h3>Pages</h3>
             <li>Home</li>
             <li>About</li>
             <li>Privacy Policy</li>
             <li>Returns</li>
             <li>Terms and Conditions</li>
          </div>
          
      </div>
      
    </div>
    <div className="copyright">
       Copyright © 2024 TechTime. All rights reserved. No part of this website may be reproduced or transmitted in any form without written permission .under the guidance of Prof. V E Pawar
    </div>
    </>
  )
}

export default Footer
