import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  addTokenToLocalStorage,
  addUserToLocalStorage,
  getTokenFromLocalStorage,
  getUserFromLocalStorage,
  removeTokenFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage';
import {
  createAddressThunk,
  fetchAllAddressesThunk,
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
  error: '',
  isLoading: false,
  emailVerificationModal: false,
  alertMessage: '',
  forgotPasswordModal: false,
  userAddresses: [],
  addresses: [],
  address: {},
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
  async (_, thunkAPI) => {
    return fetchUserThunk('/users/showMe', thunkAPI);
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
    console.log(user);
    return updateUserThunk('/users/updateUser', user, thunkAPI);
  }
);

export const updatePassword = createAsyncThunk(
  'users/updatePassword',
  async (password, thunkAPI) => {
    return updatePasswordThunk('/users/updateUserPassword', password, thunkAPI);
  }
);

export const fetchAllAddresses = createAsyncThunk(
  'users/fetchAllAddresses',
  async (_, thunkAPI) => {
    return fetchAllAddressesThunk('/address', thunkAPI);
  }
);

export const createAddress = createAsyncThunk(
  'users/createAddress',
  async (address, thunkAPI) => {
    return createAddressThunk('/address', address, thunkAPI);
  }
);

export const fetchAllUserAddresses = createAsyncThunk(
  'users/fetchAllUserAddresses',
  async (userId, thunkAPI) => {
    return fetchAllAddressesThunk(`/address/user/${userId}`, thunkAPI);
  }
);

export const fetchAddress = createAsyncThunk(
  'users/fetchAddress',
  async (addressId, thunkAPI) => {
    return fetchAllAddressesThunk(`/address/${addressId}`, thunkAPI);
  }
);

export const updateAddress = createAsyncThunk(
  'users/updateAddress',
  async (address, thunkAPI) => {
    return createAddressThunk(`/address/${address._id}`, address, thunkAPI);
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
  },
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload.users;
    },
    [fetchUsers.rejected]: (state) => {
      state.isLoading = false;
    },
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state) => {
      state.isLoading = false;
      state.emailVerificationModal = true;
      state.isSigninIn = false;
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
    [fetchAllAddresses.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchAllAddresses.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.addresses = action.payload.addresses;
    },
    [fetchAllAddresses.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [createAddress.pending]: (state) => {
      state.isLoading = true;
    },
    [createAddress.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.address = action.payload.address;
      toast.success(action.payload.msg);
    },
    [createAddress.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [fetchAllUserAddresses.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchAllUserAddresses.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userAddresses = action.payload.userAddresses;
    },
    [fetchAllUserAddresses.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [fetchAddress.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchAddress.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.address = action.payload.address;
    },
    [fetchAddress.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [updateAddress.pending]: (state) => {
      state.isLoading = true;
    },
    [updateAddress.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.addresses = state.addresses.map((address) =>
        address._id === action.payload.address._id
          ? action.payload.address
          : address
      );
      toast.success(action.payload.msg);
    },
  },
});

export const {
  toggleSignInModal,
  closeVerificationModal,
  toggleForgotPasswordModal,
  logoutUser,
} = userSlice.actions;

export default userSlice.reducer;
