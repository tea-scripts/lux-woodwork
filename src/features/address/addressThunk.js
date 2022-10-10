import { fetchAllUserAddresses } from './addressSlice';
import customFetch from '../../utils/axios';

export const fetchAllAddressesThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const fetchAddressThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createAddressThunk = async (url, address, thunkAPI) => {
  try {
    const response = await customFetch.post(url, address);
    thunkAPI.dispatch(fetchAllUserAddresses());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const updateAddressThunk = async (url, address, thunkAPI) => {
  try {
    const response = await customFetch.patch(url, address);
    thunkAPI.dispatch(fetchAllUserAddresses());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const deleteAddressThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.delete(url);
    thunkAPI.dispatch(fetchAllUserAddresses());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const fetchAllUserAddressesThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
