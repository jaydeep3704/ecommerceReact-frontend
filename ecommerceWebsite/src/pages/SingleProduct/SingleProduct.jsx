import React, { useEffect,useState } from "react";
import "./singleProduct.scss"
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

import RelatedProduct from "./RelatedProducts/RelatedProduct";
import { useParams } from "react-router-dom";
import axios from "axios";
import { addToCart,fetchCartData } from "../../features/products/cartSlice";
import { useDispatch } from "react-redux";


const SingleProduct = () => {
  const productId=useParams().id
  const [product, setProduct] = useState([])
  const[quantity,setQuantity]=useState(1)

  useEffect(() => {
    const abortController=new AbortController()
    try {
      axios
        .get(`http://127.0.0.1:8000/api/products/${productId}`,{
          signal:abortController.signal
        })
        .then((response) => setProduct(response.data));
    } catch (error) {
      setError(error)
    }
    
    return ()=>abortController.abort()

  }, [productId]);

  const handleAdd=()=>{
    setQuantity((prev)=>prev+1)
  }

  const handleSubtract=()=>{
    if(quantity>1)
    {
      setQuantity((prev)=>prev-1)
    }
  }
  
  const dispatch=useDispatch()

  const handleAddToCart = (productId, quantity) => {
    console.log(productId,quantity)
    dispatch(addToCart({ id: productId, quantity:quantity }));
    const fetchData=async()=>{
      const access_token=await localStorage.getItem('access_token')
      if (access_token) {
      await dispatch(fetchCartData({accessToken:access_token}));
      
     } else {
       // Handle missing access token (e.g., display error message)
       console.error('Access token not found');
     }
    }

    // fetchData()
  };


  return (
	<>   
   <div className="single-product-main-content">
      <div className="layout">
        <div className="single-product-page">
          <div className="left">
            <img src={product.image} alt="" />
          </div>
          <div className="right">
            <div className="prod-title">
             {product.product_name}
            </div>
            <div className="prod-price">₹{product.price}</div>
            <div className="prod-desc">
             {product.description}
            </div>
            <div className="cart-buttons">
              <div className="quantity-buttons">
                <span onClick={handleSubtract} >-</span>
                <span>{quantity}</span>
                <span onClick={handleAdd}>+</span>
              </div>
              <button className="add-to-cart" onClick={()=>handleAddToCart(productId,quantity)}>ADD TO CART</button>
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
     <RelatedProduct category={product.category} />
      </div>
    </div>


	</>

  );
};

export default SingleProduct;
