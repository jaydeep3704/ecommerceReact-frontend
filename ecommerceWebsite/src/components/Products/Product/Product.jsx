import React from 'react'
import './product.scss'
import productImg from "../../../assets/products/earbuds-prod-1.webp"
import { useNavigate } from 'react-router-dom'

const Product = ({productImg,productTitle,productPrice,id}) => {

  const navigate=useNavigate()
  const handleClick=()=>{
    navigate(`/product/${id}`)
  }

  return (
    <div className="product">
      <div className="product-img">
        <img src={productImg} alt="" />
      </div>
      <div className="prod-details">
      <div className="prod-title">{productTitle}</div>
      <div className="prod-price">&#8377; {productPrice}</div>
      </div>
      <button onClick={handleClick}>Buy Now</button>
    </div>
  )
}

export default Product
