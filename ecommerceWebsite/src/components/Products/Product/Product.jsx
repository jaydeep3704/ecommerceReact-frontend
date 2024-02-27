import React from 'react'
import './product.scss'
import productImg from "../../../assets/products/earbuds-prod-1.webp"

const Product = () => {
  return (
    <div className="product">
      <div className="product-img">
        <img src={productImg} alt="" />
      </div>
      <div className="prod-details">
      <div className="prod-title">Earbuds</div>
      <div className="prod-price">&#8377; 5509</div>
      </div>
      
    </div>
  )
}

export default Product
