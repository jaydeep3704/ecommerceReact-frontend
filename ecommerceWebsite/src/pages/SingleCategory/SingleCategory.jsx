import React,{useEffect,useState} from 'react'
import "./singlecategory.scss"
import Products from "../../components/Products/Products"
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory } from '../../features/products/productSlice';

const SingleCategory = ({}) => {

  const { id } = useParams();
  const dispatch=useDispatch()
  const { products, isLoading, error } = useSelector((state) => state.products)

 
    useEffect(() => {
      if (id) {
        dispatch(fetchProductsByCategory(id)); // Dispatch thunk based on categoryId
      }

      return () => {
        console.log('cleanup done')
      }
    
    }, [dispatch, id])
  
  
  
  
  console.log(products)
  return (
    <div className="category-main-content">
        <div className="layout">
            <div className="category-title">
               {id.toUpperCase()}
            </div>
            <Products secheading={false}/>
        </div>
    </div>
  )
}

export default SingleCategory
