import { createSlice } from '@reduxjs/toolkit';
const items = [
  {
    id: 1,
    name: 'BackBench Couch',
    price: 100,
    image: 'https://picsum.photos/200/300',
    quantity: 1,
  },
  {
    id: 2,
    name: 'High Rise Table',
    price: 140,
    image: 'https://picsum.photos/200/300',
    quantity: 3,
  },
];
const initialState = {
  cartItems: items,
  total_items: 12,
  total_amount: 0,
  total_quantity: 0,
  shipping_fee: 5.34,
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
      state.cartItems.push(action.payload);
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemID = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemID);
    },
    increase: function (state, { payload }) {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.quantity = cartItem.quantity + 1;
    },
    decrease: function (state, { payload }) {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.quantity = cartItem.quantity - 1;
    },
    calculateTotals: (state) => {
      let quantity = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        quantity += item.quantity;
        total += item.quantity * item.price;
      });
      state.total_quantity = quantity;
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
