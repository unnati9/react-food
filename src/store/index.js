import { configureStore } from "@reduxjs/toolkit";

import cartReducer from './cart';
import userProgressReducer from './user-progress';

const store = configureStore({ reducer: {cart: cartReducer, userProgress: userProgressReducer} });

export default store;