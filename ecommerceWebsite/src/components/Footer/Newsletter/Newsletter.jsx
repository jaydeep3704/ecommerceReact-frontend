import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import "./newsletter.scss"

const Newsletter = () => {
  return (
    <div className="newsletter">
      <div className="newsletter-content">
        <span className="smalltext">Newsletter</span>
        <span className="bigtext">
            Sign up for latest updates and offers
        </span>
        <div className="form">
            <input type="text" placeholder="email address"/>
            <button>Subscribe</button>
        </div>
        <div className="text">will be used in accordance with our privacy policy </div>
        <div className="social-icons">
            <div className="icon">
                <FaFacebookF/>
            </div>
            <div className="icon">
                <FaTwitter/>
            </div>
            <div className="icon">
                <FaInstagram/>
            </div>
            <div className="icon">
                <FaLinkedin/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
