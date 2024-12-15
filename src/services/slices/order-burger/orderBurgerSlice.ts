import { orderBurgerApi } from '../../../utils/burger-api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export type TNewOrderState = {
  order: TOrder | null;
  name: string;
  orderRequest: boolean;
  error: null | SerializedError;
};

const initialState: TNewOrderState = {
  order: null,
  name: '',
  orderRequest: false,
  error: null
};

export const orderBurger = createAsyncThunk(
  'orders/newOrder',
  async (data: string[]) => orderBurgerApi(data)
);

const orderBurgerSlice = createSlice({
  name: 'orderBurger',
  initialState,
  reducers: {
    closeOrderState: (state) => {
      state.orderRequest = false;
      state.order = null;
      state.name = '';
      state.error = null;
    }
  },
  selectors: {
    orderBurgerSelector: (state) => state,
    orderBurgerRequestSelector: (state) => state.orderRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
        state.order = null;
        state.error = null;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.name = action.payload.name;
        state.orderRequest = false;
        state.error = null;
      })
      .addCase(orderBurger.rejected, (state, { error }) => {
        state.orderRequest = false;
        state.order = null;
        state.error = error;
      });
  }
});

export default orderBurgerSlice.reducer;
export const { orderBurgerSelector, orderBurgerRequestSelector } =
  orderBurgerSlice.selectors;
export const { closeOrderState } = orderBurgerSlice.actions;
