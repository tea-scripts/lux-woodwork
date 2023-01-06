import customFetch from '../../utils/axios';
import { fetchAllContactUsForms } from './supportSlice';

export const fetchAllContactUsFormsThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const resolveContactUsFormThunk = async (url, data, thunkAPI) => {
  try {
    const response = await customFetch.patch(url, data);
    thunkAPI.dispatch(fetchAllContactUsForms());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const cancelContactUsFormThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.patch(url);
    thunkAPI.dispatch(fetchAllContactUsForms());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const deleteContactUsFormThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.delete(url);
    thunkAPI.dispatch(fetchAllContactUsForms());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const fetchAllSupportTicketsThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
