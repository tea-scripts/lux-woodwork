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
  contactUsThunk,
  deleteSubscriberThunk,
  fetchAllSubscribersThunk,
  fetchUsersThunk,
  fetchUserThunk,
  forgotPasswordThunk,
  loginUserThunk,
  registerUserThunk,
  resetPasswordThunk,
  subscribeToNewsLetterThunk,
  updatePasswordThunk,
  updateUserThunk,
  uploadAvatarThunk,
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
  avatar: '',
  successState: false,
  file: '',
  email: '',
  isFetchingSubscribers: false,
  subscribers: [],
  isDeletingSubscriber: false,
  isSubscribing: false,
  isUnsubscribing: false,
  name: '',
  message: '',
  subject: '',
  product_name: '',
  order_id: '',
  support_type: '',
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, thunkAPI) => {
    return fetchUsersThunk(
      `/users?page=${thunkAPI.getState().users.page}`,
      thunkAPI
    );
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

export const uploadAvatar = createAsyncThunk(
  'users/uploadAvatar',
  async (formData, thunkAPI) => {
    return uploadAvatarThunk('/uploadImage', formData, thunkAPI);
  }
);

export const contactUs = createAsyncThunk(
  'users/contactUs',
  async (formData, thunkAPI) => {
    return contactUsThunk('/contact-us', formData, thunkAPI);
  }
);

export const fetchAllSubscribers = createAsyncThunk(
  'users/getAllSubscribers',
  async (_, thunkAPI) => {
    return fetchAllSubscribersThunk('/newsletter', thunkAPI);
  }
);

export const subscribeToNewsLetter = createAsyncThunk(
  'users/subscribeToNewsLetter',
  async (email, thunkAPI) => {
    return subscribeToNewsLetterThunk('/newsletter', email, thunkAPI);
  }
);

export const deleteSubscriber = createAsyncThunk(
  'users/deleteSubscriber',
  async (id, thunkAPI) => {
    return deleteSubscriberThunk(`/newsletter/${id}`, thunkAPI);
  }
);

export const unsubscribeFromNewsLetter = createAsyncThunk(
  'users/unsubscribeFromNewsLetter',
  async (email, thunkAPI) => {
    return subscribeToNewsLetterThunk(
      '/newsletter/unsubscribe',
      email,
      thunkAPI
    );
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
      localStorage.removeItem('city');
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
    clearAvatar: (state) => {
      state.avatar = '';
    },
    handleChange: (state, { payload }) => {
      state[payload.name] = payload.value;
    },
    clearEmail: (state) => {
      state.email = '';
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
      toast.error(action.payload);
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
      state.avatar = '';
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
    [uploadAvatar.pending]: (state) => {
      state.isLoading = true;
    },
    [uploadAvatar.fulfilled]: (state, action) => {
      state.avatar = action.payload.images[0].url;
      state.isLoading = false;
      toast.success('Avatar uploaded successfully');
    },
    [uploadAvatar.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [contactUs.pending]: (state) => {
      state.isLoading = true;
    },
    [contactUs.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.successState = true;
      toast.success(action.payload.msg);
    },
    [contactUs.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [fetchAllSubscribers.pending]: (state) => {
      state.isFetchingSubscribers = true;
    },
    [fetchAllSubscribers.fulfilled]: (state, action) => {
      state.isFetchingSubscribers = false;
      state.subscribers = action.payload.subscribers;
    },
    [fetchAllSubscribers.rejected]: (state) => {
      state.isFetchingSubscribers = false;
    },
    [deleteSubscriber.pending]: (state) => {
      state.isDeletingSubscriber = true;
    },
    [deleteSubscriber.fulfilled]: (state, action) => {
      state.isDeletingSubscriber = false;
      toast.success(action.payload.msg);
    },
    [deleteSubscriber.rejected]: (state) => {
      state.isDeletingSubscriber = false;
    },
    [subscribeToNewsLetter.pending]: (state) => {
      state.isSubscribing = true;
    },
    [subscribeToNewsLetter.fulfilled]: (state, action) => {
      state.isSubscribing = false;
      state.successState = true;
      toast.success(action.payload.msg);
    },
    [subscribeToNewsLetter.rejected]: (state) => {
      state.isSubscribing = false;
    },
    [unsubscribeFromNewsLetter.pending]: (state) => {
      state.isUnsubscribing = true;
    },
    [unsubscribeFromNewsLetter.fulfilled]: (state, action) => {
      state.isUnsubscribing = false;
      state.successState = true;
      toast.success(action.payload.msg);
    },
    [unsubscribeFromNewsLetter.rejected]: (state) => {
      state.isUnsubscribing = false;
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
  clearAvatar,
  handleChange,
  clearEmail,
} = userSlice.actions;

export default userSlice.reducer;
