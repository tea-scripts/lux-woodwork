import customFetch from '../../utils/axios';
import { fetchAllContactUsForms, fetchAllTickets } from './supportSlice';

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

export const createTicketThunk = async (url, ticket, thunkAPI) => {
  try {
    const response = await customFetch.post(url, ticket);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const getUserTicketsThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const getAllTicketsThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteTicketThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.delete(url);
    thunkAPI.dispatch(fetchAllTickets());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const resolveTicketThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.patch(url);
    thunkAPI.dispatch(fetchAllTickets());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const cancelSupportTicketThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.patch(url);
    thunkAPI.dispatch(fetchAllTickets());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
