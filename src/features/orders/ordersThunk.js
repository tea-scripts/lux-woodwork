import customFetch from '../../utils/axios';
import { fetchAllOrders, fetchUserOrders } from './orderSlice';

export const fetchAllOrdersThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const fetchOrderThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateOrderThunk = async (url, paymentIntentId, thunkAPI) => {
  try {
    const response = await customFetch.patch(url, paymentIntentId);
    thunkAPI.dispatch(fetchUserOrders());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const fetchUserOrdersThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteOrderThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.delete(url);
    thunkAPI.getState().users.user.role === 'admin' &&
      thunkAPI.dispatch(fetchAllOrders());
    thunkAPI.dispatch(fetchUserOrders());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const cancelOrderThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.patch(url);
    thunkAPI.dispatch(fetchUserOrders());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const archiveOrderThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.patch(url);
    thunkAPI.dispatch(fetchAllOrders());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const unarchiveOrderThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.patch(url);
    thunkAPI.dispatch(fetchAllOrders());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const shipOrderThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.patch(url);
    thunkAPI.dispatch(fetchAllOrders());
    thunkAPI.dispatch(fetchUserOrders());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deliverOrderThunk = async (url, proofOfDelivery, thunkAPI) => {
  try {
    const response = await customFetch.patch(url, {proofOfDelivery});
    thunkAPI.dispatch(fetchAllOrders());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const receiveOrderThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.patch(url);
    thunkAPI.dispatch(fetchUserOrders());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const uploadProofOfDeliveryThunk = async (url, formData, thunkAPI) => {
  try {
    const response = await customFetch.post(url, formData, thunkAPI);
    console.log(response);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
