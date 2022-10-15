import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './features/cart/cartSlice';
import navSlice from './features/navigation/navSlice';
import userSlice from './features/users/userSlice';
import productsSlice from './features/products/productsSlice';
import addressSlice from './features/address/addressSlice';
import orderSlice from './features/orders/orderSlice';
import reviewsSlice from './features/reviews/reviewsSlice';

export const store = configureStore({
  reducer: {
    navigation: navSlice,
    users: userSlice,
    cart: cartSlice,
    products: productsSlice,
    address: addressSlice,
    orders: orderSlice,
    reviews: reviewsSlice,
  },
});
