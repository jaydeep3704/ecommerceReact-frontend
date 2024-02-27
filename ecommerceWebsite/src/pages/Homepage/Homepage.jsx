import React from 'react'
import './homepage.scss'
import Banner from "../../components/Banner/Banner"


import Category from '../Category/Category'
import Products from '../../components/Products/Products'
const Homepage = () => {
  return (
  <div className="homepage">
    <Banner/>
    <div className="main-content">
      <div className="layout">
      <Category/>
      <Products title="popular products"/>
      </div>
    </div>
  </div>
  )
}

export default Homepage
