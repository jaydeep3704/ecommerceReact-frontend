import React,{useState} from 'react'
import "./cartitem.scss"

import { MdClose } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { removeFromCart ,fetchCartData,updateCartItemQuantity} from '../../../features/products/cartSlice';
import { useDispatch } from 'react-redux';

const CartItem = ({price,image,product_name,prodquantity,productPrice,id}) => {
  
  const [isLoading, setIsLoading] = useState(true); // Track image loading state
  const[quantity,setQuantity]=useState(prodquantity)
  const[prodprice,setprodPrice]=useState(productPrice)
  const dispatch=useDispatch()
  
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleAdd=()=>{
     setQuantity((prev)=>prev+1)
     dispatch(updateCartItemQuantity({
      id,quantity
     }))
  }

  const handleSubtract=()=>{
    if(quantity>1)
    {
      setQuantity((prev)=>prev-1)
      dispatch(updateCartItemQuantity({
        id,quantity
       }))
    }
  }

  const handleRemove=async (id)=>{
   await dispatch(removeFromCart(id))
   
   const fetchData=async()=>{
    const access_token=await localStorage.getItem('access_token')
    if (access_token) {
    await dispatch(fetchCartData({accessToken:access_token}));
    
   } else {
     // Handle missing access token (e.g., display error message)
     console.error('Access token not found');
   }
  }

  fetchData()
  }

   const imageSource="http://127.0.0.1:8000/"+image
  return (

    
    <div className="item-container">

        <div className="prod-img">
            <img src={imageSource}  alt={product_name} onLoad={handleImageLoad} className={isLoading ? 'hidden' : ''} />
        </div>
        <div className="prod-info">
            <div className="prod-name">{product_name}</div>
            
              <div className="quantity-buttons">
                <span onClick={handleSubtract} >-</span>
                <span>{quantity}</span>
                <span onClick={handleAdd}>+</span>
              </div>
              
               
              <MdClose onClick={()=>handleRemove(id)}/>
           

              <div className="price">
                <span>{quantity}</span>
                <span> x </span>
                <span>{productPrice}</span>
              </div>
        </div>
    </div>
  )
}

export default CartItem
