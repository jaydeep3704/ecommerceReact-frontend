import React from "react";
import "./cart.scss";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
// import CartItem from "./CartItem/CartItem";

const Cart = ({ setShowCart }) => {
  return (
    <div className="cart-panel">
      <div className="opac-layer"></div>
      <div className="cart-content">
        <div className="cart-header">
          <span className="cart-heading">Shopping Cart</span>
          <span
            className="close-btn"
            onClick={() => {
              setShowCart(false);
            }}
          >
            <MdClose />
            <span className="text">close</span>
          </span>
        </div>

        {/* <div className="empty-cart">
            <BsCartX/>
            <span>No products in the cart</span>
            <button className='return-cta'>return to shop</button>
          </div> */}
        <>
          {/* <CartItem/> */}
          <div className="cart-footer">
            <div className="subtotal">
               <div className="text">Subtotal:</div>
               <div className="text totalPrice">&#8377; 8000</div>
            </div>
            <div className="checkout">
              <button className="checkout-cta">Checkout</button>
            </div>
          </div>
          </>
      </div>
    </div>
  );
};

export default Cart;
