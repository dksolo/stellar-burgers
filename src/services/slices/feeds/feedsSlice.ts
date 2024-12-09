import { getFeedsApi } from '@api';
import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type TFeedsState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

const initialState: TFeedsState = {
  orders: [],
  total: 0,
  totalToday: 0
};

export const getFeeds = createAsyncThunk('feeds/getFeeds', async () =>
  getFeedsApi()
);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    ordersFeedsSelector: (state) => state.orders,
    totalFeedsSelector: (state) => state.total,
    totalTodayFeedsSelector: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder.addCase(getFeeds.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
  }
});

export default feedsSlice.reducer;
export const {
  ordersFeedsSelector,
  totalFeedsSelector,
  totalTodayFeedsSelector
} = feedsSlice.selectors;
