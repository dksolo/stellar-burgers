import { combineReducers } from '@reduxjs/toolkit';

import constructorReducer from './slices/constructorSlice';
import feedsReducer from './slices/feedsSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import orderBurgerReducer from './slices/orderBurgerSlice';
import orderReducer from './slices/orderSlice';
import ordersReducer from './slices/ordersSlice';
import userReducer from './slices/userSlice';

export const rootReducer = combineReducers({
  burgerConstructor: constructorReducer,
  feeds: feedsReducer,
  ingredients: ingredientsReducer,
  orderBurger: orderBurgerReducer,
  order: orderReducer,
  orders: ordersReducer,
  user: userReducer
});
