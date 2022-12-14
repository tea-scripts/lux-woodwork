import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  createAddressThunk,
  deleteAddressThunk,
  fetchAllAddressesThunk,
  selectDefaultAddressThunk,
  updateAddressThunk,
} from "../address/addressThunk";

const initialState = {
  isLoading: false,
  userAddresses: [],
  addresses: [],
  defaultAddress: {},
  pages: 1,
};

export const fetchAllAddresses = createAsyncThunk(
  "users/fetchAllAddresses",
  async (_, thunkAPI) => {
    return fetchAllAddressesThunk("/address", thunkAPI);
  }
);

export const createAddress = createAsyncThunk(
  "users/createAddress",
  async (address, thunkAPI) => {
    return createAddressThunk("/address", address, thunkAPI);
  }
);

export const fetchAllUserAddresses = createAsyncThunk(
  "users/fetchAllUserAddresses",
  async (page, thunkAPI) => {
    return fetchAllAddressesThunk(
      `/address/user/${thunkAPI.getState().users.user._id}?page=${page}`,
      thunkAPI
    );
  }
);

export const fetchAddress = createAsyncThunk(
  "users/fetchAddress",
  async (addressId, thunkAPI) => {
    return fetchAllAddressesThunk(`/address/${addressId}`, thunkAPI);
  }
);

export const updateAddress = createAsyncThunk(
  "users/updateAddress",
  async (address, thunkAPI) => {
    return updateAddressThunk(`/address/${address._id}`, address, thunkAPI);
  }
);

export const deleteAddress = createAsyncThunk(
  "users/deleteAddress",
  async (addressId, thunkAPI) => {
    return deleteAddressThunk(`/address/${addressId}`, thunkAPI);
  }
);

export const selectDefaultAddress = createAsyncThunk(
  "users/selectDefaultAddress",
  async (addressId, thunkAPI) => {
    return selectDefaultAddressThunk(`/address/default/${addressId}`, thunkAPI);
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllAddresses.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchAllAddresses.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.addresses = action.payload.addresses;
    },
    [fetchAllAddresses.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [createAddress.pending]: (state) => {
      state.isLoading = true;
    },
    [createAddress.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.address = action.payload.address;
      toast.success("Address created successfully");
    },
    [createAddress.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [fetchAllUserAddresses.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchAllUserAddresses.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.defaultAddress = action.payload.userAddresses.find(
        (address) => address.defaultAddress
      );
      localStorage.setItem("city", state.defaultAddress?.city);
      state.userAddresses = action.payload.userAddresses;
      state.pages = action.payload.pages;
    },
    [fetchAllUserAddresses.rejected]: (state, action) => {
      state.isLoading = false;
      // console.log(action);
      // console.log(action.payload);
      toast.error(action.payload);
    },
    [fetchAddress.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchAddress.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.address = action.payload.address;
    },
    [fetchAddress.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [updateAddress.pending]: (state) => {
      state.isLoading = true;
    },
    [updateAddress.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.addresses = state.addresses.map((address) =>
        address._id === action.payload.address._id
          ? action.payload.address
          : address
      );
      toast.success(action.payload.msg);
    },
    [updateAddress.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [deleteAddress.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteAddress.fulfilled]: (state, action) => {
      state.isLoading = false;
      toast.success("Address deleted successfully");
    },
    [deleteAddress.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [selectDefaultAddress.pending]: (state) => {
      state.isLoading = true;
    },
    [selectDefaultAddress.fulfilled]: (state, action) => {
      state.isLoading = false;
      toast.success(action.payload.msg);
    },
    [selectDefaultAddress.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
  },
});

export default addressSlice.reducer;
