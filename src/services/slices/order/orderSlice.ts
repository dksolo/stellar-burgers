import { getOrderByNumberApi } from '../../../utils/burger-api';
import { TOrder } from '../../../utils/types';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';

export type TOrderState = {
  order: TOrder | null;
  error: null | SerializedError;
};

const initialState: TOrderState = {
  order: null,
  error: null
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
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.order = action.payload.orders[0] ?? null;
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, { error }) => {
        state.order = null;
        state.error = error;
      });
  }
});

export default orderSlice.reducer;
export const { getOrderSelector, getOrderNumberSelector } =
  orderSlice.selectors;
