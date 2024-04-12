import React,{useEffect, useState} from "react";
import "./cart.scss";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import CartItem from "./CartItem/CartItem";
import { MdShoppingCartCheckout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { fetchCartData } from "../../features/products/cartSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Cart = ({ setShowCart }) => {

  const navigate=useNavigate()
  const dispatch=useDispatch()
  useEffect(() => {
  
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

  }, [])

  const cartData = useSelector(state => state.cart.cart_items);
  


 const subTotal=cartData.length>0 && cartData[0].cart.total_price
 




  return (
    <div className="cart-panel hide-scrollbar">
      <div className="opac-layer"></div>
      <div className="cart-content">
        <div className="cart-header">
          <span className="cart-heading">Shopping Cart</span>
          <span
            className="close-btn"
            onClick={() => {
              setShowCart(false);
            }}
          >
            <MdClose />
            <span className="text">close</span>
          </span>
        </div>

        



        
        <>

        {
        
        (cartData.length<=0)?
        <div className="empty-cart">
            <BsCartX/>
            <span>No products in the cart</span>
            <button className='return-cta' onClick={()=>{navigate('/');setShowCart(false)}}>return to shop</button>
          </div> 
          :
          <>
          
          {
            cartData.map((elem)=>{
               const product=elem.product
               const price=elem.price
               const image=product.image
               const product_name=(product.product_name.length >=60)? product.product_name.substring(0,60)+"...":product.product_name
               const quantity=elem.quantity
               const key=elem.id
               const productPrice=product.price

              return  <CartItem key={key} price={price} image={image} product_name={product_name} prodquantity={quantity} productPrice={productPrice} id={key}/>
            })
          }


          <div className="cart-footer">
            <div className="subtotal">
               <div className="text">Subtotal:</div>
               <div className="text totalPrice">&#8377; {subTotal}</div>
            </div>
            <div className="checkout">
              <button className="checkout-cta" ><MdShoppingCartCheckout/>Checkout</button>
            </div>
          </div>
          </>
          }
          </>
      </div>
    </div>
  );
};

export default Cart;
