import { getOrdersApi } from '../../../utils/burger-api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export type TOrdersState = {
  orders: TOrder[];
  error: null | SerializedError;
};

const initialState: TOrdersState = {
  orders: [],
  error: null
};

export const getOrders = createAsyncThunk('orders/getOrders', async () =>
  getOrdersApi()
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    ordersSelector: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state) => {
      state.error = null;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.error = null;
    });
    builder.addCase(getOrders.rejected, (state, { error }) => {
      state.error = error;
    });
  }
});

export default ordersSlice.reducer;
export const { ordersSelector } = ordersSlice.selectors;
