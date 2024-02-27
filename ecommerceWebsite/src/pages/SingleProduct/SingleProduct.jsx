import React from "react";
import "./singleProduct.scss"
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import prodImg from "../../assets/products/watch-prod-2.webp";
import RelatedProduct from "./RelatedProducts/RelatedProduct";


const SingleProduct = () => {
  return (
	<>    <div className="single-product-main-content">
      <div className="layout">
        <div className="single-product-page">
          <div className="left">
            <img src={prodImg} alt="" />
          </div>
          <div className="right">
            <div className="prod-title">
              boAt Ultima Select Smart Watch with 2.01" AMOLED Display, Advanced
              BT Calling, Functional Crown, Always on Display
            </div>
            <div className="prod-price">₹2,999</div>
            <div className="prod-desc">
              AMOLED Display: Immerse yourself in the brilliance of a 2.01"
              (5.10 cm) AMOLED display, delivering vibrant visuals and clarity
              to enhance your smartwatch experience Advanced Bluetooth Calling:
              Stay connected on the go with advanced Bluetooth calling directly
              from your wrist, ensuring seamless communication wherever you are.
              Functional Crown: Navigate effortlessly through features with the
              functional crown, adding a touch of sophistication and
              practicality to your smartwatch interaction. Always on Display:
              Keep track of time and notifications at a glance with the
              always-on display, providing instant access to essential
              information.
            </div>
            <div className="cart-buttons">
              <div className="quantity-buttons">
                <span>-</span>
                <span>5</span>
                <span>+</span>
              </div>
              <button className="add-to-cart">ADD TO CART</button>
            </div>
            <div className="divider"></div>
            <div className="info-item">
              <div className="text-bold"></div>
              <div className="social-icons">
                <FaTwitter />
                <FaFacebook />
                <AiFillInstagram />
              </div>
            </div>
          </div>
        </div>
     <RelatedProduct/>
      </div>
    </div>


	</>

  );
};

export default SingleProduct;
