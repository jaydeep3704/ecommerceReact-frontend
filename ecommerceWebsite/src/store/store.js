import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../features/products/productSlice'
import authReducer from "../features/products/authSlice";;
import cartReducer from "../features/products/cartSlice"
import shippingReducer from "../features/products/shippingSlice"
import paymentReducer from "../features/products/paymentSlice"
export const store=configureStore({
    reducer:{
        products:productReducer,
        auth:authReducer,
        cart:cartReducer,
        shipping:shippingReducer,
        payment:paymentReducer

    }
})