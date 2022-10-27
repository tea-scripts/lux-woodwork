import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  archiveOrderThunk,
  cancelOrderThunk,
  deleteOrderThunk,
  deliverOrderThunk,
  fetchAllOrdersThunk,
  fetchOrderThunk,
  fetchUserOrdersThunk,
  shipOrderThunk,
  unarchiveOrderThunk,
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
  expiryDate: '',
  totalPages: 0,
  totalOrders: 0,
  actionConfirmModal: false,
  shippingAddress: {},
  isShipped: false,
  isDelivered: false,
  shippedOrders: [],
  totalShippedOrders: 0,
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
      `/orders/show-my-orders/${
        thunkAPI.getState().users.user._id
      }?page=${page}`,
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

export const archiveOrder = createAsyncThunk(
  'orders/archiveOrder',
  async (id, thunkAPI) => {
    return archiveOrderThunk(`/orders/archive/${id}`, thunkAPI);
  }
);

export const unarchiveOrder = createAsyncThunk(
  'orders/unarchiveOrder',
  async (id, thunkAPI) => {
    return unarchiveOrderThunk(`/orders/unarchive/${id}`, thunkAPI);
  }
);

export const shipOrder = createAsyncThunk(
  'orders/shipOrder',
  async (orderId, thunkAPI) => {
    return shipOrderThunk(`/orders/ship/${orderId}`, thunkAPI);
  }
);

export const deliverOrder = createAsyncThunk(
  'orders/deliverOrder',
  async (orderId, thunkAPI) => {
    return deliverOrderThunk(`/orders/deliver/${orderId}`, thunkAPI);
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
      state.expiryDate = payload.expiryDate;
      state.shippingAddress = payload.shippingAddress;
      state.isShipped = payload.isShipped;
      state.isDelivered = payload.isDelivered;
    },
    toggleOrderView: (state) => {
      state.isViewing = !state.isViewing;
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    togggleActionConfirmModal: (state) => {
      state.actionConfirmModal = !state.actionConfirmModal;
    },
  },
  extraReducers: {
    [fetchAllOrders.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchAllOrders.fulfilled]: (state, action) => {
      const { orders, totalPages, totalOrders } = action.payload;
      state.orders = orders;
      state.totalPages = Math.ceil(
        orders.filter(
          (order) => order.isArchived === false && order.isDeleted === false
        ).length / 10
      );
      state.totalOrders = orders.filter(
        (order) => order.isArchived === false && order.isDeleted === false
      ).length;
      state.shippedOrders = orders.filter((order) => order.isShipped === true);
      state.totalShippedOrders = orders.filter(
        (order) => order.isShipped === true
      ).length;
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
    [archiveOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [archiveOrder.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success('Order archived successfully');
    },
    [archiveOrder.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [unarchiveOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [unarchiveOrder.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success('Order unarchived successfully');
    },
    [unarchiveOrder.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [shipOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [shipOrder.fulfilled]: (state) => {
      state.isLoading = false;
      state.isViewing = false;
      toast.success('Order shipped successfully');
    },
    [shipOrder.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [deliverOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [deliverOrder.fulfilled]: (state) => {
      state.isLoading = false;
      state.isViewing = false;
      toast.success('Order delivered successfully');
    },
    [deliverOrder.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
  },
});

export const {
  setOrderValues,
  toggleOrderView,
  changePage,
  togggleActionConfirmModal,
} = orderSlice.actions;

export default orderSlice.reducer;
