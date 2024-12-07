import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type TIngredientsState = {
  ingredients: TIngredient[];
  loading: boolean;
};

const initialState: TIngredientsState = {
  ingredients: [],
  loading: true
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
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload;
      state.loading = false;
    });
  }
});

export default ingredientsSlice.reducer;
export const { ingredientsSelector, ingredientsLoadingSelector } =
  ingredientsSlice.selectors;
export const getIngredientByID =
  (id: string | undefined) => (state: RootState) =>
    state.ingredients.ingredients.find((i) => i._id === id);
