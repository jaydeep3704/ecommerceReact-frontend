import React,{useState,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import "./checkout.scss";
import { fetchCartData } from "../../features/products/cartSlice";
import {createPayment} from "../../features/products/paymentSlice"

import axios from "axios";

import Loader from "../../components/Loader/Loader"
const Checkout = () => {

   const dispatch=useDispatch()
      useEffect(() => {
        const fetchData=async()=>{
          const access_token= localStorage.getItem('access_token')
          if (access_token) {
          await dispatch(fetchCartData({accessToken:access_token}));
          
         } else {
           // Handle missing access token (e.g., display error message)
           console.error('Access token not found');
         }
        }
        fetchData()
   
  }, [])

  const cartData=useSelector((state)=>state.cart.cart_items)
  const amount=cartData[0].cart.total_price
  
  const[data,setData]=useState({
    firstName: '',
    lastName: '',
    postalCode: 0,
    address: '',
    phoneNo: 0
  })





  


const handlePayment=(e)=>{
  e.preventDefault();

  const options = {
    "key": "rzp_test_E3pM3Y97Snz6i7", // Enter the Key ID generated from the Dashboard
    "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "TechTime", //your business name
    "description": "Purchase",
    "image": "https://example.com/your_logo",
    "order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": function (response){
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature)
    },
    "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        "name": "", //your customer's name
        "email": "", 
        "contact": ""  //Provide the customer's phone number for better conversion rates 
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};



  const pay=async ()=>{
    const data=await dispatch(createPayment({amount:amount}))
    console.log(data)
    const order_id=data.payload.payment.id

    var rzp1 = new Razorpay({...options,order_id:order_id});
    rzp1.on('payment.failed', function (response){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
});
    rzp1.open();
  
  }
 pay()
}

 
const imageSource = "http://127.0.0.1:8000/" ;


  return (

    <div className="checkout">
      <div className="checkout-container">
      <div className="heading">Checkout</div>
        <div className="customer-info-container">
            <h3>Customer Info</h3>
          <div className="customer-info">
            <div className="info-div">
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" placeholder="First Name"onChange={(e)=>setData({...data,firstName:e.target.value})} value={data.firstName}/>
            </div>
            <div className="info-div">
              <label htmlFor="lastName">Last Name</label>
              <input type="lastName" placeholder="Last Name" onChange={(e)=>setData({...data,lastName:e.target.value})} value={data.lastName}/>
            </div>
            <div className="info-div">
              <label htmlFor="phoneno">Phone No</label>
              <input type="number" placeholder="Phone no"  onChange={(e)=>setData({...data,phoneNo:e.target.value})} value={data.phoneNo} />
            </div>
          </div>
        </div>


        <div className="billingAddress">
            <h3>Billing Address</h3>
            <div className="billing-info">
                <div className="billing-div">
                <label htmlFor="address">Address</label>
                <input type="text" id="address" placeholder="enter your address"  style={{"width":"700px"}}   onChange={(e)=>setData({...data,address:e.target.value})} value={data.address}/>
                </div>
                <div className="billing-div">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input type="number" id="postalCode" placeholder="postal code" style={{"width":"350px"}} onChange={(e)=>setData({...data,postalCode:e.target.value})} value={data.postalCode}/>
                </div>

            </div>
        </div>
        <button onClick={handlePayment}>Complete And Pay</button>
      </div>

      <div className="checkout-items">
          <div className="totalprice">Subtotal : {useSelector(state=>state.cart.cart_items)[0].cart.total_price}</div>
          <div className="item-container">

          
          {cartData?
            cartData.map((item)=>{
              const prodimg=imageSource+item.product.image
              const productname=item.product.product_name

              
              return (
               <div className="item" key={item.id}>
                <div className="prod-info">
                <img src={prodimg} alt={productname} />
                  <span className="prod-title">{productname.length>77? productname.substring(0,80)+"...":productname}</span>
                </div>
                 <span className="price">{item.quantity} x {item.product.price} = {item.price} </span>
              </div>
              )
            }):
            <Loader/>
          }



              

          </div>
      </div>
    </div>
  );
};

export default Checkout;
