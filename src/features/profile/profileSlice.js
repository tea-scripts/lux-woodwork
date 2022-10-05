import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "johnsmith123",
  email: "john@gmail.com",
  firstName: "John",
  lastName: "Smith",
  phoneNumber: "09782123221",
  addresses: [],
  wishlist: [],
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      const { firstName, lastName, phoneNumber } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.phoneNumber = phoneNumber;
    },
    addToWishlist: (state, action) => {
      const { id } = action.payload;
      const exists = state.wishlist.find((item) => item.id === id);
      if (!exists) state.wishlist.push({ id });
    },
    removeFromWishlist: (state, action) => {
      const { id } = action.payload;
      state.wishlist = state.wishlist.filter((item) => item.id !== id);
    },
  },
});

export const { updateProfile, addToWishlist, removeFromWishlist } =
  profileSlice.actions;

export default profileSlice.reducer;
