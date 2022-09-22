import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSigninIn: false,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    toggleSignInModal: (state) => {
      state.isSigninIn = !state.isSigninIn;
    },
  },
});

export const { toggleSignInModal } = userSlice.actions;

export default userSlice.reducer;
