import React from 'react'
import "./cartitem.scss"
import prodImg from "../../../assets/products/watch-prod-2.webp"
import { MdClose } from "react-icons/md";
const CartItem = () => {
  return (
    <div className="item-container">
        <div className="prod-img">
            <img src={prodImg} alt="" />
        </div>
        <div className="prod-info">
            <div className="prod-name">Product name <MdClose/></div>
            <div className="quantity-buttons">
                <span>-</span>
                <span>5</span>
                <span>+</span>
              </div>
              <div className="price">
                <span>2</span>
                <span> x </span>
                <span>4000</span>
              </div>
        </div>
    </div>
  )
}

export default CartItem
