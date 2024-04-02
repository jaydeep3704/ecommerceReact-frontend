import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Import axios

const initialState = {
  cart_items: [],
  isLoading: false,
  error: null,
  currentCategory: null,
  user: null,
};


const BASE_URL="http://127.0.0.1:8000/api/"

export const fetchCartData = createAsyncThunk(
  'cart/fetchCartData', // Action type identifier
  async (args, thunkAPI) => {
    const { accessToken } = args; // Destructure arguments

    console.log(accessToken);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/cart/', {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Combine tokens
        },
      });

      if (!response.data) {
        throw new Error('No data received from the API');
      }

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Handle errors
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (data, thunkAPI) => {
    const { user } = thunkAPI.getState().auth; // Access user data from auth slice (replace 'auth' with your slice name)
    const accessToken = localStorage.getItem('access_token'); // Assuming access token is stored in localStorage

    try {
      const response = await axios.post(
        `${BASE_URL}cart/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || 'Failed to add item to cart');
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (id, thunkAPI) => {
    const { user } = thunkAPI.getState().auth; // Access user data from auth slice
    const accessToken = localStorage.getItem('access_token');

    try {
      const response = await axios.delete(`${BASE_URL}cart/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: { id },
      });

      return response.data; // Assuming the response contains a success message or data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || 'Failed to remove item from cart');
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateCartItemQuantity',
  async ({ id, quantity }, thunkAPI) => {
    const { user } = thunkAPI.getState().auth; // Access user data from auth slice
    const accessToken = localStorage.getItem('access_token');

    try {
      const response = await axios.put(
        `${BASE_URL}cart/`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          data:{
            id:id,
            quantity:quantity
          }
        }
      );

      return response.data; // Assuming the response contains updated item data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || 'Failed to update item quantity');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart_items = action.payload; // Update cart_items with the response data
        state.currentCategory = action.meta.arg; // Store the fetched category (optional)
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
