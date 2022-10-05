import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cart/cartSlice";
import navSlice from "./features/navigation/navSlice";
import userSlice from "./features/users/userSlice";
import productsSlice from "./features/products/productsSlice";
import profileSlice from "./features/profile/profileSlice";

export const store = configureStore({
  reducer: {
    navigation: navSlice,
    users: userSlice,
    cart: cartSlice,
    products: productsSlice,
    profile: profileSlice,
  },
});
