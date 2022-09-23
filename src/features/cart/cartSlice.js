import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  isCartOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    openCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { addToCart, openCart } = cartSlice.actions;

export default cartSlice.reducer;
