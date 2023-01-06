import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  cancelSupportTicketThunk,
  createTicketThunk,
  deleteTicketThunk,
  getAllTicketsThunk,
  getUserTicketsThunk,
  resolveTicketThunk,
} from './supportThunk';
import { toast } from 'react-toastify';
import {
  cancelContactUsFormThunk,
  deleteContactUsFormThunk,
  fetchAllContactUsFormsThunk,
  resolveContactUsFormThunk,
} from './supportThunk';

export const createTicket = createAsyncThunk(
  'support/createTicket',
  async (ticket, thunkAPI) => {
    return createTicketThunk(`/support-ticket`, ticket, thunkAPI);
  }
);

export const getUserTickets = createAsyncThunk(
  'support/getUserTickets',
  async ({ page, limit }, thunkAPI) => {
    return getUserTicketsThunk(
      `/support-ticket/user?page=${page}&limit=${limit}`,
      thunkAPI
    );
  }
);

export const fetchAllTickets = createAsyncThunk(
  'support/getAllTickets',
  async (_, thunkAPI) => {
    return getAllTicketsThunk(
      `/support-ticket?page=${thunkAPI.getState().support.page}`,
      thunkAPI
    );
  }
);

export const resolveSupportTicket = createAsyncThunk(
  'support/resolveSupportTicket',
  async (id, thunkAPI) => {
    return resolveTicketThunk(`/support-ticket/resolve/${id}`, thunkAPI);
  }
);

export const cancelSupportTicket = createAsyncThunk(
  'support/cancelSupportTicket',
  async (id, thunkAPI) => {
    return cancelSupportTicketThunk(`/support-ticket/cancel/${id}`, thunkAPI);
  }
);

export const fetchAllContactUsForms = createAsyncThunk(
  'support/fetchAllContactUsForms',
  async (_, thunkAPI) => {
    return fetchAllContactUsFormsThunk(
      `/contact-us?page=${thunkAPI.getState().support.contactUsFormPage}`,
      thunkAPI
    );
  }
);

export const deleteTicket = createAsyncThunk(
  'support/deleteTicket',
  async (id, thunkAPI) => {
    return deleteTicketThunk(`/support-ticket/${id}`, thunkAPI);
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
    return cancelContactUsFormThunk(`/contact-us/cancel/${id}`, thunkAPI);
  }
);

export const deleteContactForm = createAsyncThunk(
  'support/deleteContactForm',
  async (id, thunkAPI) => {
    return deleteContactUsFormThunk(`/contact-us/${id}`, thunkAPI);
  }
);

const supportSlice = createSlice({
  name: 'support',
  initialState: {
    supportTickets: [],
    page: 1,
    totalSupportTickets: 0,
    totalSupportTicketPages: 0,
    userTickets: [],
    contactUsForms: [],
    supportTicket: {},
    isCreatingSupportTickets: false,
    isFetchingSupportTickets: false,
    isDeletingSupportTicket: false,
    isUpdatingSupportTicket: false,
    viewSupportTicket: false,
    viewContactUsForm: false,
    isFetchingContactUsForms: false,
    isUpdatingContactUsForm: false,
    isDeletingContactUsForm: false,
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
    pages: 0,
    count: 0,
    username: '',
    user: {},
    supportTicketId: '',
  },
  reducers: {
    setSupportTicket: (state, { payload }) => {
      state.supportTicketId = payload._id;
      state.username = payload.username;
      state.message = payload.message;
      state.email = payload.email;
      state.subject = payload.subject;
      state.user = payload.user;
      state.status = payload.status;
      state.viewSupportTicket = true;
    },
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
    resetSupportTicket: (state) => {
      state.supportTicketId = '';
      state.username = '';
      state.message = '';
      state.email = '';
      state.subject = '';
      state.user = {};
      state.status = '';
      state.viewSupportTicket = false;
    },
    resetContactUsForm: (state) => {
      state.name = '';
      state.email = '';
      state.subject = '';
      state.message = '';
      state.order_id = '';
      state.support_type = '';
      state.status = '';
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
    changePage: (state, { payload }) => {
      state.page = payload;
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
      })
      .addCase(deleteContactForm.pending, (state) => {
        state.isDeletingContactUsForm = true;
      })
      .addCase(deleteContactForm.fulfilled, (state, { payload }) => {
        state.isDeletingContactUsForm = false;
        toast.success(payload.msg);
      })
      .addCase(deleteContactForm.rejected, (state) => {
        state.isDeletingContactUsForm = false;
      })
      .addCase(createTicket.pending, (state) => {
        state.isCreatingSupportTickets = true;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.supportTicket = action.payload;
        state.isCreatingSupportTickets = false;
        toast.success('Ticket created successfully');
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isCreatingSupportTickets = false;
        toast.error(action.payload.msg);
      })
      .addCase(getUserTickets.pending, (state) => {
        state.isFetchingContactUsForms = true;
      })
      .addCase(getUserTickets.fulfilled, (state, action) => {
        state.pages = action.payload.pages;
        state.count = action.payload.count;
        state.userTickets = action.payload.tickets;
        state.isFetchingContactUsForms = false;
      })
      .addCase(getUserTickets.rejected, (state, action) => {
        state.isFetchingSupportTickets = false;
        toast.error(action.payload.msg);
      })
      .addCase(fetchAllTickets.pending, (state) => {
        state.isFetchingSupportTickets = true;
      })
      .addCase(fetchAllTickets.fulfilled, (state, { payload }) => {
        state.supportTickets = payload.tickets;
        state.totalSupportTicketPages = payload.pages;
        state.totalSupportTickets = payload.count;
        state.isFetchingSupportTickets = false;
      })
      .addCase(fetchAllTickets.rejected, (state) => {
        state.isFetchingSupportTickets = false;
      })
      .addCase(deleteTicket.pending, (state) => {
        state.isDeletingSupportTicket = true;
      })
      .addCase(deleteTicket.fulfilled, (state, { payload }) => {
        state.isDeletingSupportTicket = false;
        toast.success(payload.msg);
      })
      .addCase(deleteTicket.rejected, (state) => {
        state.isDeletingSupportTicket = false;
      })
      .addCase(resolveSupportTicket.pending, (state) => {
        state.isUpdatingSupportTicket = true;
      })
      .addCase(resolveSupportTicket.fulfilled, (state, { payload }) => {
        state.isUpdatingSupportTicket = false;
        toast.success(payload.msg);
      })
      .addCase(resolveSupportTicket.rejected, (state) => {
        state.isUpdatingSupportTicket = false;
      })
      .addCase(cancelSupportTicket.pending, (state) => {
        state.isUpdatingSupportTicket = true;
      })
      .addCase(cancelSupportTicket.fulfilled, (state, { payload }) => {
        state.isUpdatingSupportTicket = false;
        toast.success(payload.msg);
      })
      .addCase(cancelSupportTicket.rejected, (state) => {
        state.isUpdatingSupportTicket = false;
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
  changePage,
} = supportSlice.actions;

export default supportSlice.reducer;
