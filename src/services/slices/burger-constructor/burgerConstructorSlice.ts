import { TConstructorIngredient, TIngredient } from '../../../utils/types';
import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { swapItemsInArray } from '../../sliceUtils/reusableUtils';

export type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        switch (action.payload.type) {
          case 'bun':
            state.bun = action.payload;
            break;

          default:
            state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (i) => i.id !== action.payload.id
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient & { direction: string }>
    ) => {
      const ingredientIndex = state.ingredients.findIndex(
        (i) => i.id === action.payload.id
      );
      state.ingredients = swapItemsInArray<TConstructorIngredient>(
        ingredientIndex,
        state.ingredients,
        action.payload.direction
      );
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    constructorSelector: (state) => state
  }
});

export default constructorSlice.reducer;
export const { constructorSelector } = constructorSlice.selectors;
export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = constructorSlice.actions;
