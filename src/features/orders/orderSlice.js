import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  cancelOrderThunk,
  deleteOrderThunk,
  fetchAllOrdersThunk,
  fetchOrderThunk,
  fetchUserOrdersThunk,
  updateOrderThunk,
} from './ordersThunk';

const initialState = {
  orders: [],
  userOrders: [],
  order: {},
  isLoading: false,
  isViewing: false,
  user: {},
  orderItems: [],
  tax: 0,
  shipping: 0,
  total: 0,
  subtotal: 0,
  createdAt: '',
  orderId: '',
  status: '',
  pages: 1,
  page: 1,
  totalPages: 0,
  totalOrders: 0,
};

export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAllOrders',
  async (_, thunkAPI) => {
    return fetchAllOrdersThunk(
      `/orders?page=${thunkAPI.getState().orders.page}`,
      thunkAPI
    );
  }
);

export const fetchOrder = createAsyncThunk(
  'orders/fetchOrder',
  async (orderId, thunkAPI) => {
    return fetchOrderThunk(`/orders/${orderId}`, thunkAPI);
  }
);

export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async ({ orderId, paymentIntentId }, thunkAPI) => {
    return updateOrderThunk(
      `/orders/${orderId}`,
      { paymentIntentId },
      thunkAPI
    );
  }
);

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (page, thunkAPI) => {
    return fetchUserOrdersThunk(
      `/orders/show-my-orders?page=${page}`,
      thunkAPI
    );
  }
);

export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (orderId, thunkAPI) => {
    return deleteOrderThunk(`/orders/${orderId}`, thunkAPI);
  }
);

export const cancelOrder = createAsyncThunk(
  'orders/cancelOrder',
  async (orderId, thunkAPI) => {
    return cancelOrderThunk(`/orders/cancel/${orderId}`, thunkAPI);
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrderValues: (state, { payload }) => {
      state.subtotal = payload.subtotal;
      state.tax = payload.tax;
      state.shipping = payload.shippingFee;
      state.total = payload.total;
      state.orderItems = payload.orderItems;
      state.user = payload.user;
      state.status = payload.status;
      state.createdAt = payload.createdAt;
      state.orderId = payload._id;
    },
    toggleOrderView: (state) => {
      state.isViewing = !state.isViewing;
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
  },
  extraReducers: {
    [fetchAllOrders.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchAllOrders.fulfilled]: (state, action) => {
      const { orders, totalPages, totalOrders } = action.payload;
      state.orders = orders;
      state.totalPages = totalPages;
      state.totalOrders = totalOrders;
      state.isLoading = false;
    },
    [fetchAllOrders.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [fetchUserOrders.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchUserOrders.fulfilled]: (state, action) => {
      console.log('action payload', action.payload);
      state.userOrders = action.payload.orders;
      state.pages = action.payload.pages;
      state.isLoading = false;
    },
    [fetchUserOrders.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [fetchOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchOrder.fulfilled]: (state, action) => {
      state.order = action.payload.order;
      state.isLoading = false;
    },
    [fetchOrder.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [deleteOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteOrder.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success('Order deleted successfully');
    },
    [deleteOrder.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [updateOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [updateOrder.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [updateOrder.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [cancelOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [cancelOrder.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success('Order cancelled successfully');
    },
    [cancelOrder.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
  },
});

export const { setOrderValues, toggleOrderView, changePage } =
  orderSlice.actions;

export default orderSlice.reducer;
