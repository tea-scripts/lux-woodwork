import customFetch from "../../utils/axios";
import { fetchUserWishlist } from "./wishlistSlice";

export const fetchUserWishlistThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const addWishlistItemThunk = async (url, product, thunkAPI) => {
  try {
    const response = await customFetch.post(url, product, thunkAPI);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const deleteWishlistItemThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.delete(url);
    thunkAPI.dispatch(fetchUserWishlist());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
