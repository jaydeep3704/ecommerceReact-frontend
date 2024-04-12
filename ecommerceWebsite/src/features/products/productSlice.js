import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Import axios

const initialState = {
  products: [],
  isLoading: false,
  error: null,
  currentCategory: null,
};

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (categoryId) => {
    const response = await axios.get("http://127.0.0.1:8000/api/categories/"+categoryId+"/products/");
    return response.data;
  }
);

const BASE_URL = "http://127.0.0.1:8000/api/";

export const filterProducts = createAsyncThunk(
  'products/filterProducts',
  async (input) => {
    try {
      const url = input ? `${BASE_URL}products/?search=${input}` : `${BASE_URL}products/`; // Build URL with category parameter if provided
      const response = await axios.get(url);

      if (!response.data) {
        throw new Error('No products found');
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Handle errors
    }
  }
);



const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        state.currentCategory = action.meta.arg; // Store the fetched category
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(filterProducts.pending, (state, action) => {
        state.isLoading = true;
        state.error = null; // Update products with filtered results
      })
      .addCase(filterProducts.fulfilled,(state,action)=>{
        state.isLoading=false;
        state.products=action.payload
      })
      .addCase(filterProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
