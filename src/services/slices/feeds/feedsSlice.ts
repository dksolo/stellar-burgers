import { getFeedsApi } from '../../../utils/burger-api';
import { TOrder } from '@utils-types';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';

export type TFeedsState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: null | SerializedError;
  success: boolean;
};

const initialState: TFeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  success: false,
  loading: false,
  error: null
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
    builder
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.loading = false;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error;
        state.success = false;
      });
  }
});

export default feedsSlice.reducer;
export const {
  ordersFeedsSelector,
  totalFeedsSelector,
  totalTodayFeedsSelector
} = feedsSlice.selectors;
