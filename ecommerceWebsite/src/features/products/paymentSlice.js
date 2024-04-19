import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  paymentInfo: {
    amount: '',
  },
  orderId: null,
  isLoading: false,
  error: null,
};

const BASE_URL="http://127.0.0.1:8000/api/"

export const createPayment = createAsyncThunk(
  'payment/createPayment',
  async (paymentInfo, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('access_token'); // Assuming token retrieval
    const { amount } = paymentInfo;

    try {
      const response = await axios.post(
        `${BASE_URL}razorpay/pay/`,
        { amount },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      return response.data; // Assuming successful response data with order ID
    } catch (error) {
      return rejectWithValue(error.message); // Handle errors
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentInfo(state, action) {
      state.paymentInfo = action.payload;
    },
    resetPaymentInfo(state) {
      state.paymentInfo = initialState.paymentInfo;
      state.orderId = null;
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
      .addCase(createPayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderId = action.payload.payment.id; // Assuming order ID from response
        state.paymentInfo = initialState.paymentInfo; // Reset payment info after success
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setPaymentInfo, resetPaymentInfo, setIsLoading, setError } = paymentSlice.actions;

export default paymentSlice.reducer;
