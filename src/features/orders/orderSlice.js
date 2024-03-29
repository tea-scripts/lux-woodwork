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
  receiveOrderThunk,
  shipOrderThunk,
  unarchiveOrderThunk,
  updateOrderThunk,
  uploadProofOfDeliveryThunk,
} from './ordersThunk';

const initialState = {
  orders: [],
  order_id: '',
  userOrders: [],
  order: {},
  isFetchingOrders: false,
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
  userOrdersQueryType: 'All',
  orderPlaced: false,
  proofOfDelivery: '',
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
      }?page=${page}&&type=${thunkAPI.getState().orders.userOrdersQueryType}`,
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
  async ({ orderId, proofOfDelivery }, thunkAPI) => {
    return deliverOrderThunk(
      `/orders/deliver/${orderId}`,
      proofOfDelivery,
      thunkAPI
    );
  }
);

export const receiveOrder = createAsyncThunk(
  'orders/receiveOrder',
  async (orderId, thunkAPI) => {
    return receiveOrderThunk(`/orders/receive/${orderId}`, thunkAPI);
  }
);

export const uploadProofOfDelivery = createAsyncThunk(
  'orders/uploadProofOfDelivery',
  async (formData, thunkAPI) => {
    return uploadProofOfDeliveryThunk('/uploadImage', formData, thunkAPI);
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
      state.proofOfDelivery = payload.proofOfDelivery;
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
    setUserOrdersQueryType: (state, { payload }) => {
      state.userOrdersQueryType = payload;
    },
    handleChange: (state, { payload }) => {
      state[payload.name] = payload.value;
    },
    resetOrder: (state) => {
      state.order = {};
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
      state.userOrders = action.payload.orders;
      state.pages = action.payload.pages;
      state.isLoading = false;
    },
    [fetchUserOrders.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [fetchOrder.pending]: (state) => {
      state.isFetchingOrder = true;
    },
    [fetchOrder.fulfilled]: (state, action) => {
      state.order = action.payload.order;
      state.isFetchingOrder = false;
    },
    [fetchOrder.rejected]: (state, action) => {
      state.isFetchingOrder = false;
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
    [receiveOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [receiveOrder.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success('Order received successfully');
    },
    [receiveOrder.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [uploadProofOfDelivery.pending]: (state) => {
      state.isLoading = true;
    },
    [uploadProofOfDelivery.fulfilled]: (state, action) => {
      state.proofOfDelivery = action.payload.images[0].url;
      state.isLoading = false;
      toast.success('Proof of delivery uploaded successfully');
    },
    [uploadProofOfDelivery.rejected]: (state, action) => {
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
  setUserOrdersQueryType,
  handleChange,
  resetOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
