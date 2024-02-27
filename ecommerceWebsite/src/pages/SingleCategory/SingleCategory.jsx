import React from 'react'
import "./singlecategory.scss"
import Products from "../../components/Products/Products"
const SingleCategory = () => {
  return (
    <div className="category-main-content">
        <div className="layout">
            <div className="category-title">
                Category Title
            </div>
            <Products secheading={false}/>
        </div>
    </div>
  )
}

export default SingleCategory
