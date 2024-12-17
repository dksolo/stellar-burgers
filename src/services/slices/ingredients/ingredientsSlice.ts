import { getIngredientsApi } from '../../../utils/burger-api';
import { TIngredient } from '@utils-types';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { RootState } from '../../store';

export type TIngredientsState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: null | SerializedError;
};

const initialState: TIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    ingredientsSelector: (state) => state.ingredients,
    ingredientsLoadingSelector: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error;
      });
  }
});

export default ingredientsSlice.reducer;
export const { ingredientsSelector, ingredientsLoadingSelector } =
  ingredientsSlice.selectors;
export const getIngredientByID =
  (id: string | undefined) => (state: RootState) =>
    state.ingredients.ingredients.find((i) => i._id === id);
