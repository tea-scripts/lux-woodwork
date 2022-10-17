import customFetch from "../../utils/axios";
import { fetchAllOrders, fetchUserOrders } from "./orderSlice";

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
    thunkAPI.getState().users.user.role === "admin" &&
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
