import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  addTokenToLocalStorage,
  addUserToLocalStorage,
  addWishlistToLocalStorage,
  getTokenFromLocalStorage,
  getUserFromLocalStorage,
  getWishlistFromLocalStorage,
  removeTokenFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage';
import {
  fetchUsersThunk,
  fetchUserThunk,
  forgotPasswordThunk,
  loginUserThunk,
  registerUserThunk,
  resetPasswordThunk,
  updatePasswordThunk,
  updateUserThunk,
} from './userThunk';

const initialState = {
  isSigninIn: false,
  users: [],
  user: getUserFromLocalStorage(),
  token: getTokenFromLocalStorage(),
  singleUser: {},
  singleUserModal: false,
  error: '',
  isLoading: false,
  emailVerificationModal: false,
  alertMessage: '',
  forgotPasswordModal: false,
  userAddresses: [],
  addresses: [],
  address: {},
  wishlist: getWishlistFromLocalStorage(),
  totalUsers: 0,
  page: 1,
  totalPages: 0,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, thunkAPI) => {
    return fetchUsersThunk('/users', thunkAPI);
  }
);

export const registerUser = createAsyncThunk(
  'users/registerUser',
  async (user, thunkAPI) => {
    return registerUserThunk('/auth/register', user, thunkAPI);
  }
);

export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async (_id, thunkAPI) => {
    return fetchUserThunk(`users/${_id}`, thunkAPI);
  }
);

export const loginUser = createAsyncThunk(
  'users/loginUser',
  async (user, thunkAPI) => {
    return loginUserThunk('/auth/login', user, thunkAPI);
  }
);

export const forgotPassword = createAsyncThunk(
  'users/forgotPassword',
  async (email, thunkAPI) => {
    return forgotPasswordThunk('/auth/forgot-password', email, thunkAPI);
  }
);

export const resetPassword = createAsyncThunk(
  'users/resetPassword',
  async (password, thunkAPI) => {
    return resetPasswordThunk('/auth/reset-password', password, thunkAPI);
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (user, thunkAPI) => {
    return updateUserThunk('/users/updateUser', user, thunkAPI);
  }
);

export const updatePassword = createAsyncThunk(
  'users/updatePassword',
  async (password, thunkAPI) => {
    return updatePasswordThunk('/users/updateUserPassword', password, thunkAPI);
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    toggleSignInModal: (state) => {
      state.isSigninIn = !state.isSigninIn;
    },
    closeVerificationModal: (state) => {
      state.emailVerificationModal = false;
    },
    toggleForgotPasswordModal: (state) => {
      state.forgotPasswordModal = !state.forgotPasswordModal;
      state.isSigninIn = false;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      removeUserFromLocalStorage();
      removeTokenFromLocalStorage();
    },
    addToWishlist: (state, action) => {
      const { id } = action.payload;
      const wishlist = state.wishlist;
      const product = wishlist.find((item) => item.id === id);
      if (!product) {
        state.wishlist = [...wishlist, action.payload];
      }
      addWishlistToLocalStorage(state.wishlist);
    },
    removeFromWishlist: (state, action) => {
      const { id } = action.payload;
      state.wishlist = state.wishlist.filter((item) => item.id !== id);
      addWishlistToLocalStorage(state.wishlist);
    },
    toggleSingleUserModal: (state) => {
      state.singleUserModal = !state.singleUserModal;
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      const { users, totalPages, totalUsers } = action.payload;
      state.users = users;
      state.totalPages = totalPages;
      state.totalUsers = totalUsers;
    },
    [fetchUsers.rejected]: (state) => {
      state.isLoading = false;
    },
    [fetchUser.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.singleUser = action.payload.user;
      state.singleUserModal = true;
    },
    [fetchUser.rejected]: (state) => {
      state.isLoading = false;
    },
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state) => {
      state.isLoading = false;
      state.emailVerificationModal = true;
      state.isSigninIn = false;
      toast.success('Please Verify Your Email!');
    },
    [registerUser.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      const { user, token } = action.payload;
      state.isLoading = false;
      state.user = user;
      state.token = token;
      state.isSigninIn = false;
      addTokenToLocalStorage(token);
      addUserToLocalStorage(user);
      toast.success('Welcome back ' + user.username);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.msg);
    },
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      addUserToLocalStorage(action.payload.user);
      toast.success('Profile updated successfully');
    },
    [updateUser.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [updatePassword.pending]: (state) => {
      state.isLoading = true;
    },
    [updatePassword.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success('Password updated successfully');
    },
    [updatePassword.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [forgotPassword.pending]: (state) => {
      state.isLoading = true;
    },
    [forgotPassword.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.forgotPasswordModal = false;
      toast.success(action.payload.msg);
    },
    [forgotPassword.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [resetPassword.pending]: (state) => {
      state.isLoading = true;
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.alertMessage = action.payload.msg;
    },
    [resetPassword.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.msg;
    },
  },
});

export const {
  toggleSignInModal,
  closeVerificationModal,
  toggleForgotPasswordModal,
  logoutUser,
  addToWishlist,
  removeFromWishlist,
  toggleSingleUserModal,
  changePage,
} = userSlice.actions;

export default userSlice.reducer;
