import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addWishlistItemThunk,
  deleteWishlistItemThunk,
  fetchUserWishlistThunk,
} from "./wishlistThunk";

const initialState = {
  wishlist: [],
  error: null,
  isLoading: false,
};

export const fetchUserWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, thunkAPI) => {
    return fetchUserWishlistThunk(
      `/wishlist/${thunkAPI.getState().users.user._id}`,
      thunkAPI
    );
  }
);

export const addWishlistItem = createAsyncThunk(
  "wishlist/addWishlistItem",
  async (product, thunkAPI) => {
    return addWishlistItemThunk(`/wishlist`, product, thunkAPI);
  }
);

export const deleteWishlistItem = createAsyncThunk(
  "wishlist/deleteWishlistItem",
  async (wishlistItemId, thunkAPI) => {
    // console.log(wishlistItemId);
    return deleteWishlistItemThunk(`/wishlist/${wishlistItemId}`, thunkAPI);
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUserWishlist.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchUserWishlist.fulfilled]: (state, action) => {
      state.wishlist = action.payload;
      state.isLoading = false;
    },
    [fetchUserWishlist.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [addWishlistItem.pending]: (state) => {
      state.isLoading = true;
    },
    [addWishlistItem.fulfilled]: (state, action) => {
      console.log(action.payload);
      toast.success("Item added to wishlist");
    },
    [addWishlistItem.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [deleteWishlistItem.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteWishlistItem.fulfilled]: (state, action) => {
      state.isLoading = false;
      toast.success("Item removed from wishlist");
    },
    [deleteWishlistItem.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
  },
});

export default wishlistSlice.reducer;
