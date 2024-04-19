import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  shippingInfo: {
    firstName: '',
    lastName: '',
    postalCode: 0,
    address: '',
    phoneNo: 0,
  },
  isLoading: false,
  error: null,
};


export const postShippingInfo = createAsyncThunk(
  'shipping/postShippingInfo',
  async (shippingInfo, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem('access_token'); // Assuming token retrieval

      const response = await axios.post(
        'http://127.0.0.1:8000/api/razorpay/shipping/', // Replace with your API endpoint
        shippingInfo,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      return response.data; // Assuming successful response data
    } catch (error) {
      return rejectWithValue(error.message); // Handle errors
    }
  }
);

const shippingSlice = createSlice({
  name: 'shipping',
  initialState,
  reducers: {
    updateShippingInfo(state, action) {
      state.shippingInfo = { ...state.shippingInfo, ...action.payload };
    },
    resetShippingInfo(state) {
      state.shippingInfo = initialState.shippingInfo;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postShippingInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postShippingInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shippingInfo = initialState.shippingInfo; // Reset after success (optional)
      })
      .addCase(postShippingInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { updateShippingInfo, resetShippingInfo, setIsLoading, setError } = shippingSlice.actions;

export default shippingSlice.reducer;
