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
  const [payment,setPayment]=useState({order_id:'',payment_id:'',payment_signature:''})
  const[shipping,setShipping]=useState({
    firstName: '',
    lastName: '',
    postalCode: 0,
    address: '',
    phoneNo: 0
  })


  const handlePaymentSuccess = async (response) => {
    try {
      let bodyData = new FormData();

      // we will send the response we've got from razorpay to the backend to validate the payment
      bodyData.append("response", JSON.stringify(response));
      console.log(response)
      await Axios({
        url: `http://127.0.0.1:8000/api/razorpay/payment/success/`,
        method: "POST",
        data: bodyData,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log("Everything is OK!");
          console.log(res)
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(console.error());
    }
  };


  


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
        alert(response.razorpay_signature);
        handlePaymentSuccess(response)
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

if(shipping.firstName=='' || shipping.lastName=='' ||  shipping.phoneNo.length<10 || shipping.postalCode.length<6 || shipping.address=='')
{
  console.log("phone no ",shipping.phoneNo.length)
  alert("Enter correct shipping details")
  
}
else{
  if(shipping.postalCode.length<6 && shipping.phoneNo.length<10)
  {
    alert("Enter correct shipping details ")
  }
  else 
  {
    pay()
  }
 
}

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
              <input type="text" id="firstName" placeholder="First Name"onChange={(e)=>setShipping({...shipping,firstName:e.target.value})} value={shipping.firstName}/>
            </div>
            <div className="info-div">
              <label htmlFor="lastName">Last Name</label>
              <input type="lastName" placeholder="Last Name" onChange={(e)=>setShipping({...shipping,lastName:e.target.value})} value={shipping.lastName}/>
            </div>
            <div className="info-div">
              <label htmlFor="phoneno">Phone No</label>
              <input type="number" placeholder="Phone no"  onChange={(e)=>setShipping({...shipping,phoneNo:e.target.value})} value={shipping.phoneNo} />
            </div>
          </div>
        </div>


        <div className="billingAddress">
            <h3>Billing Address</h3>
            <div className="billing-info">
                <div className="billing-div">
                <label htmlFor="address">Address</label>
                <input type="text" id="address" placeholder="enter your address"  style={{"width":"700px"}}   onChange={(e)=>setShipping({...shipping,address:e.target.value})} value={shipping.address}/>
                </div>
                <div className="billing-div">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input type="number" id="postalCode" placeholder="postal code" style={{"width":"350px"}} onChange={(e)=>setShipping({...shipping,postalCode:e.target.value})} value={shipping.postalCode}/>
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
                  <span className="prod-title">{productname.length>70? productname.substring(0,70)+"...":productname}</span>
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
