import React from 'react'
import "./products.scss"
import Product from './Product/Product'
const Products = ({secheading=true,title=""}) => {
  return (
    <div className='products-container'>
      {secheading && <div className="sec-heading">{title}</div>}
      <div className="products">
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
      </div>
    </div>
  )
}

export default Products
