import customFetch from '../../utils/axios';
import { clearValues, fetchUserReviews } from './reviewsSlice';

export const fetchReviewsThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const fetchUserReviewsThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const createReviewThunk = async (url, review, thunkAPI) => {
  try {
    const response = await customFetch.post(url, review);
    thunkAPI.dispatch(fetchUserReviews());
    thunkAPI.dispatch(clearValues());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const updateReviewThunk = async (url, review, thunkAPI) => {
  try {
    const response = await customFetch.patch(url, review);
    thunkAPI.dispatch(fetchUserReviews());
    thunkAPI.dispatch(clearValues());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteReviewThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.delete(url);
    thunkAPI.dispatch(fetchUserReviews());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const archiveReviewThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.patch(url);
    thunkAPI.dispatch(fetchUserReviews());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const unarchiveReviewThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.patch(url);
    thunkAPI.dispatch(fetchUserReviews());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
