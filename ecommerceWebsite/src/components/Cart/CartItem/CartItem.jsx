import React, { useState, useEffect } from 'react';
import "./cartitem.scss";

import { MdClose } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { removeFromCart, updateCartItemQuantity,fetchCartData} from '../../../features/products/cartSlice';
import { useDispatch, useSelector } from 'react-redux';




const CartItem = ({ price, image, product_name, productPrice, id }) => {

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart_items);

  const [isLoading, setIsLoading] = useState(true); // Track image loading state
  const [quantity, setQuantity] = useState(0); // Initialize quantity to 0


  const fetchData=async()=>{
    const access_token=await localStorage.getItem('access_token')
    if (access_token) {
    await dispatch(fetchCartData({accessToken:access_token}));
    
   } else {
     // Handle missing access token (e.g., display error message)
     console.error('Access token not found');
   }
  }





  // Fetch initial quantity from Redux on component mount
  useEffect(() => {
    const foundItem = cartItems.find((item) => item.id === id);
    setQuantity(foundItem?.quantity || 0); // Use optional chaining for potential missing item
  }, [cartItems, id]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleAdd = async () => {
    setQuantity(quantity + 1); // Update local state first for immediate UI feedback
    await dispatch(updateCartItemQuantity({ id, quantity: quantity + 1 })); // Dispatch action for server update
    dispatch(calculateSubtotal())
  };

  const handleSubtract = async () => {
    if (quantity > 1) {
      setQuantity(quantity - 1); // Update local state first for immediate UI feedback
      await dispatch(updateCartItemQuantity({ id, quantity: quantity - 1 })); // Dispatch action for server update
      dispatch(calculateSubtotal())
      
    }
  };

  const handleRemove = async (id) => {
    await dispatch(removeFromCart(id));
    // No need to re-fetch data here, Redux state should be updated by the action
    fetchData()
  };

  const imageSource = "http://127.0.0.1:8000/" + image;

  return (
    <div className="item-container">
      <div className="prod-img">
        <img
          src={imageSource}
          alt={product_name}
          onLoad={handleImageLoad}
          className={isLoading ? 'hidden' : ''}
        />
      </div>
      <div className="prod-info">
        <div className="prod-name">{product_name}</div>

        <div className="quantity-buttons">
          <span onClick={handleSubtract}>-</span>
          <span>{quantity}</span>
          <span onClick={handleAdd}>+</span>
        </div>

        <MdClose onClick={() => handleRemove(id)} />

        <div className="price">
          <span>{quantity}</span>
          <span> x </span>
          <span>{productPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
