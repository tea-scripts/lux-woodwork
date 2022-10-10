import customFetch from '../../utils/axios';
import { clearValues, fetchAllProducts } from './productsSlice';

export const fetchAllProductsThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const fetchProductThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createProductThunk = async (url, product, thunkAPI) => {
  try {
    const response = await customFetch.post(url, product);
    thunkAPI.dispatch(fetchAllProducts());
    thunkAPI.dispatch(clearValues());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const uploadProductImageThunk = async (url, formData, thunkAPI) => {
  try {
    const response = await customFetch.post(url, formData, thunkAPI);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateProductThunk = async (url, product, thunkAPI) => {
  try {
    const response = await customFetch.patch(url, product);
    thunkAPI.dispatch(fetchAllProducts());
    thunkAPI.dispatch(clearValues());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteProductThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.delete(url);
    thunkAPI.dispatch(fetchAllProducts());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
