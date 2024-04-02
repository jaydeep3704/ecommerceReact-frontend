import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Import axios

const initialState = {
  cart_items: [],
  isLoading: false,
  error: null,
  currentCategory: null,
  user: null,
};

export const fetchCartData = createAsyncThunk(
  'cart/fetchCartData', // Action type identifier
  async (args, thunkAPI) => {
    const { accessToken } = args; // Destructure arguments

    console.log(accessToken);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/cart', {
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
