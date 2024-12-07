import { TConstructorIngredient, TIngredient } from '../../utils/types';
import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';

type TConstructorState = {
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

const swapItemsInArray = <T>(i: number, array: T[], direction: string): T[] => {
  switch (direction) {
    case 'UP':
      return [
        ...array.slice(0, i - 1),
        array[i],
        array[i - 1],
        ...array.slice(i + 1)
      ];
    case 'DOWN':
      return [
        ...array.slice(0, i),
        array[i + 1],
        array[i],
        ...array.slice(i + 2)
      ];

    default:
      return array;
  }
};

export default constructorSlice.reducer;
export const { constructorSelector } = constructorSlice.selectors;
export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = constructorSlice.actions;
