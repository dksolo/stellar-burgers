import { combineReducers } from '@reduxjs/toolkit';

import constructorReducer from '../slices/burger-constructor/burgerConstructorSlice';
import feedsReducer from '../slices/feeds/feedsSlice';
import ingredientsReducer from '../slices/ingredients/ingredientsSlice';
import orderBurgerReducer from '../slices/order-burger/orderBurgerSlice';
import orderReducer from '../slices/order/orderSlice';
import ordersReducer from '../slices/orders/ordersSlice';
import userReducer from '../slices/user/userSlice';

export const rootReducer = combineReducers({
  burgerConstructor: constructorReducer,
  feeds: feedsReducer,
  ingredients: ingredientsReducer,
  orderBurger: orderBurgerReducer,
  order: orderReducer,
  orders: ordersReducer,
  user: userReducer
});
