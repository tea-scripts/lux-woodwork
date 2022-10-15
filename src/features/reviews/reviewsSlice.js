import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  createReviewThunk,
  deleteReviewThunk,
  fetchReviewsThunk,
  updateReviewThunk,
} from './reviewsThunk';

const initialState = {
  reviews: [],
  error: null,
  isLoading: false,
  rating: 0,
  comment: '',
};

export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (_, thunkAPI) => {
    return fetchReviewsThunk(`/reviews`, thunkAPI);
  }
);

export const createReview = createAsyncThunk(
  'reviews/createReview',
  async (review, thunkAPI) => {
    return createReviewThunk(`/reviews`, review, thunkAPI);
  }
);

export const updateReview = createAsyncThunk(
  'reviews/updateReview',
  async (review, thunkAPI) => {
    return updateReviewThunk(`/reviews/${review.reviewId}`, review, thunkAPI);
  }
);

export const deleteReview = createAsyncThunk(
  'reviews/deleteReview',
  async (reviewId, thunkAPI) => {
    return deleteReviewThunk(`/reviews/${reviewId}`, thunkAPI);
  }
);

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    handleChange: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
    clearValues: () => {
      return {
        ...initialState,
      };
    },
    setReviewValues: (state, action) => {
      state.rating = action.payload.rating;
      state.comment = action.payload.comment;
    },
  },
  extraReducers: {
    [fetchReviews.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchReviews.fulfilled]: (state, action) => {
      state.reviews = action.payload.reviews;
      state.isLoading = false;
    },
    [fetchReviews.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [createReview.pending]: (state) => {
      state.isLoading = true;
    },
    [createReview.fulfilled]: (state, action) => {
      state.reviews.push(action.payload.review);
      state.isLoading = false;
    },
    [createReview.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [updateReview.pending]: (state) => {
      state.isLoading = true;
    },
    [updateReview.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success('Review updated successfully');
    },
    [updateReview.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [deleteReview.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteReview.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success('Review deleted successfully');
    },
    [deleteReview.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
  },
});

export const { handleChange, clearValues, setReviewValues } =
  reviewsSlice.actions;

export default reviewsSlice.reducer;
