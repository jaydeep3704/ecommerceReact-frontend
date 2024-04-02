import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../features/products/productSlice'
import authReducer from "../features/products/authSlice";;
import cartReducer from "../features/products/cartSlice"
export const store=configureStore({
    reducer:{
        products:productReducer,
        auth:authReducer,
        cart:cartReducer
    }
})