import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  fetchAllContactUsFormsThunk,
  resolveContactUsFormThunk,
} from './supportThunk';

export const fetchAllContactUsForms = createAsyncThunk(
  'support/fetchAllContactUsForms',
  async (_, thunkAPI) => {
    return fetchAllContactUsFormsThunk(
      `/contact-us?page=${thunkAPI.getState().support.contactUsFormPage}`,
      thunkAPI
    );
  }
);

export const resolveContactUsForm = createAsyncThunk(
  'support/resolveContactUsForm',
  async (data, thunkAPI) => {
    return resolveContactUsFormThunk(`/contact-us/${data._id}`, data, thunkAPI);
  }
);

export const cancelContactForm = createAsyncThunk(
  'support/cancelContactForm',
  async (id, thunkAPI) => {
    return resolveContactUsFormThunk(`/contact-us/cancel/${id}`, thunkAPI);
  }
);

const supportSlice = createSlice({
  name: 'support',
  initialState: {
    supportTickets: [],
    contactUsForms: [],
    supportTicket: {},
    isFetchingSupportTickets: false,
    viewSupportTicket: false,
    viewContactUsForm: false,
    isFetchingContactUsForms: false,
    isUpdatingContactUsForm: false,
    contactFormId: '',
    name: '',
    email: '',
    subject: '',
    message: '',
    order_id: '',
    support_type: '',
    status: '',
    product: {},
    contactUsFormPage: 1,
    totalContactUsForms: 0,
    totalContactUsFormPages: 0,
  },
  reducers: {
    setSupportTicket: (state, { payload }) => {},
    setContactUsForm: (state, { payload }) => {
      state.name = payload.name;
      state.contactFormId = payload._id;
      state.email = payload.email;
      state.subject = payload.subject;
      state.message = payload.message;
      state.order_id = payload.order_id;
      state.support_type = payload.support_type;
      state.status = payload.status;
      state.product = payload.product_name;
      state.viewContactUsForm = true;
    },
    resetSupportTicket: (state) => {},
    resetContactUsForm: (state) => {
      state.name = '';
      state.contactFormId = '';
      state.email = '';
      state.subject = '';
      state.message = '';
      state.order_id = '';
      state.support_type = '';
      state.status = '';
      state.product = {};
      state.viewContactUsForm = false;
    },
    changeContactUsFormPage: (state, { payload }) => {
      state.contactUsFormPage = payload;
    },
    handleChange: (state, { payload }) => {
      state[payload.name] = payload.value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllContactUsForms.pending, (state) => {
        state.isFetchingContactUsForms = true;
      })
      .addCase(fetchAllContactUsForms.fulfilled, (state, { payload }) => {
        state.contactUsForms = payload.queries;
        state.totalContactUsForms = payload.totalQueries;
        state.totalContactUsFormPages = payload.totalPages;
        state.isFetchingContactUsForms = false;
      })
      .addCase(fetchAllContactUsForms.rejected, (state) => {
        state.isFetchingContactUsForms = false;
      })
      .addCase(resolveContactUsForm.pending, (state) => {
        state.isUpdatingContactUsForm = true;
      })
      .addCase(resolveContactUsForm.fulfilled, (state, { payload }) => {
        state.isUpdatingContactUsForm = false;
        toast.success(payload.msg);
      })
      .addCase(resolveContactUsForm.rejected, (state) => {
        state.isUpdatingContactUsForm = false;
      })
      .addCase(cancelContactForm.pending, (state) => {
        state.isUpdatingContactUsForm = true;
      })
      .addCase(cancelContactForm.fulfilled, (state, { payload }) => {
        state.isUpdatingContactUsForm = false;
        toast.success(payload.msg);
      })
      .addCase(cancelContactForm.rejected, (state) => {
        state.isUpdatingContactUsForm = false;
      });
  },
});

export const {
  setSupportTicket,
  setContactUsForm,
  resetSupportTicket,
  resetContactUsForm,
  changeContactUsFormPage,
  handleChange,
} = supportSlice.actions;

export default supportSlice.reducer;
