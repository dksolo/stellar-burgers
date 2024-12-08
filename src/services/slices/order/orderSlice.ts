import { getOrderByNumberApi } from '@api';
import { TOrder } from '../../../utils/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type TOrderState = {
  order: TOrder | null;
};

const initialState: TOrderState = {
  order: null
};

export const getOrderByNumber = createAsyncThunk(
  'getOrderByNumber',
  async (i: number) => getOrderByNumberApi(i)
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    getOrderSelector: (state) => state.order,
    getOrderNumberSelector: (state) => state.order?.number
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.order = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.order = action.payload.orders[0] ?? null;
      });
  }
});

export default orderSlice.reducer;
export const { getOrderSelector, getOrderNumberSelector } =
  orderSlice.selectors;
