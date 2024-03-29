import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getShippingFee } from '../../utils/shippingRates';
import { shippingFees } from '../../utils/shippingRates';

const cartItems = localStorage.getItem('cartItems');

const initialState = {
  cartItems: cartItems ? JSON.parse(cartItems) : [],
  total_items: 0,
  total_amount: 0,
  total_quantity: 0,
  shipping_fee: 0,
  tax: 0,
  isCartOpen: false,
  shippingFees: shippingFees,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    openCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },

    addToCart: (state, action) => {
      const { id, quantity } = action.payload;

      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }

      state.total_items = state.cartItems.length;
      state.total_amount = state.cartItems.reduce(
        (acc, item) => acc + item.quantity * item.priceWithVAT,
        0
      );
      state.total_quantity = state.cartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      toast.success('Item added to cart');

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    removeItem: (state, action) => {
      const itemID = action.payload;

      state.cartItems = state.cartItems.filter((item) => item.id !== itemID);

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    increase: (state, { payload }) => {
      const { id } = payload;

      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...payload, quantity: 1 });
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    decrease: (state, { payload }) => {
      const { id } = payload;

      const tempCart = state.cartItems.map((cartItem) => {
        if (cartItem.id === id) {
          let newQuantity = cartItem.quantity - 1;
          if (newQuantity < 1) {
            newQuantity = 1;
          }
          return { ...cartItem, quantity: newQuantity };
        }
        return cartItem;
      });
      state.cartItems = tempCart;

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    calculateTotals: (state) => {
      let quantity = 0;
      let total = 0;
      let taxPercent = 0.12;

      state.cartItems.forEach((item) => {
        quantity += item.quantity;
        total += item.quantity * item.priceWithVAT;
      });

      state.total_quantity = quantity;
      state.tax = (total * taxPercent) / 100;
      state.shipping_fee = getShippingFee(localStorage.getItem('city'));
      state.total_amount = total;
    },
  },
});

export const {
  addToCart,
  openCart,
  clearCart,
  increase,
  decrease,
  calculateTotals,
  removeItem,
} = cartSlice.actions;

export default cartSlice.reducer;
