import customFetch from '../../utils/axios';
import { logoutUser } from './userSlice';

export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const response = await customFetch.post(url, user);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const fetchUsersThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url, {
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().users.token}`,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const response = await customFetch.post(url, user);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const resetPasswordThunk = async (url, password, thunkAPI) => {
  try {
    const response = await customFetch.post(url, password);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const forgotPasswordThunk = async (url, email, thunkAPI) => {
  try {
    const response = await customFetch.post(url, email);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateUserThunk = async (url, user, thunkAPI) => {
  try {
    const response = await customFetch.patch(url, user, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().users.token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Unauthorized! Logging Out..');
    }
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updatePasswordThunk = async (url, password, thunkAPI) => {
  try {
    const response = await customFetch.patch(url, password, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().users.token}`,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const fetchUserThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const fetchAllAddressesThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().users.token}`,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const fetchAddressThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().users.token}`,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createAddressThunk = async (url, address, thunkAPI) => {
  try {
    const response = await customFetch.post(url, address, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().users.token}`,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateAddressThunk = async (url, address, thunkAPI) => {
  try {
    const response = await customFetch.patch(url, address, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().users.token}`,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteAddressThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.delete(url, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().users.token}`,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const fetchAllUserAddressesThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().users.token}`,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
