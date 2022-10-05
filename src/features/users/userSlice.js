import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import {
  addTokenToLocalStorage,
  addUserToLocalStorage,
  getTokenFromLocalStorage,
  getUserFromLocalStorage,
  removeTokenFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage';

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
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get('/users', {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().users.token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  'users/registerUser',
  async (user, thunkAPI) => {
    try {
      const response = await customFetch.post('/auth/register', user);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get(`/users/showMe`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const loginUser = createAsyncThunk(
  'users/loginUser',
  async (user, thunkAPI) => {
    try {
      const response = await customFetch.post('/auth/login', user);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'users/forgotPassword',
  async (email, thunkAPI) => {
    try {
      const response = await customFetch.post('/auth/forgot-password', email);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'users/resetPassword',
  async (password, thunkAPI) => {
    try {
      const response = await customFetch.post('/auth/reset-password', password);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (user, thunkAPI) => {
    try {
      const response = await customFetch.patch(`/users/updateMe`, user, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().users.user.token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
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
    [registerUser.fulfilled]: (state, action) => {
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
      toast.success('Login successful');
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.msg);
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
} = userSlice.actions;

export default userSlice.reducer;
