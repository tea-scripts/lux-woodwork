import { createSlice } from '@reduxjs/toolkit';

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
    name: '',
    email: '',
    subject: '',
    message: '',
    order_id: '',
    support_type: '',
    status: '',
    product: {},
  },
  reducers: {
    setSupportTicket: (state, { payload }) => {},
    setContactUsForm: (state, { payload }) => {
      state.name = payload.name;
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
      state.email = '';
      state.subject = '';
      state.message = '';
      state.order_id = '';
      state.support_type = '';
      state.status = '';
      state.product = {};
      state.viewContactUsForm = false;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  setSupportTicket,
  setContactUsForm,
  resetSupportTicket,
  resetContactUsForm,
} = supportSlice.actions;

export default supportSlice.reducer;
