import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './features/cart/cartSlice';
import navSlice from './features/navigation/navSlice';
import userSlice from './features/users/userSlice';

export const store = configureStore({
  reducer: {
    navigation: navSlice,
    users: userSlice,
    cart: cartSlice,
  },
});
