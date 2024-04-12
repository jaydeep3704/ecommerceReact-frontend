import React, { useState,useEffect } from 'react'
import "./search.scss"
import { CiSearch } from "react-icons/ci";
import Products from '../../components/Products/Products';
import {  useDispatch } from 'react-redux';
import { filterProducts } from '../../features/products/productSlice';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';

const Search = () => {


const dispatch=useDispatch()
 const[input,setInput]=useState('')
 
 
const handleClick=async ()=>{
  await dispatch(filterProducts(input))

}



useEffect(() => {
 
  if(input=='')
  {
     dispatch(filterProducts(input))
  }

}, [input])


const { products, isLoading, error } = useSelector((state) => state.products)


  return (
    <div className='search'>
      <div className="search-container">
        <div className="searchbar">
            <input type="text" onChange={(e)=>setInput(e.target.value)} value={input} placeholder='Type to Search ...' />
            <CiSearch style={{fontSize:"1.5rem",cursor:"pointer"}} onClick={handleClick}/>
        </div>
        <div className="products">
             {isLoading?<Loader/> :<Products secheading={false} />}
        </div>

      
      
      </div>
    
    </div>
  )
}

export default Search
