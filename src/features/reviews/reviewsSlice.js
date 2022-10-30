import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  archiveReviewThunk,
  createReviewThunk,
  deleteReviewThunk,
  fetchReviewsThunk,
  fetchSingleReviewThunk,
  fetchUserReviewsThunk,
  unarchiveReviewThunk,
  updateReviewThunk,
} from "./reviewsThunk";

const initialState = {
  reviews: [],
  userReviews: [],
  error: null,
  isLoading: false,
  rating: 0,
  comment: "",
  product: "",
  pages: 1,
  totalPages: 0,
  totalReviews: 0,
  page: 1,
  actionConfirmModal: false,
  review: "",
};

export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (_, thunkAPI) => {
    return fetchReviewsThunk(`/reviews`, thunkAPI);
  }
);

export const fetchUserReviews = createAsyncThunk(
  "reviews/fetchUserReviews",
  async (page, thunkAPI) => {
    return fetchUserReviewsThunk(
      `/reviews/user/${thunkAPI.getState().users.user._id}?page=${page}`,
      thunkAPI
    );
  }
);

export const fetchSingleReview = createAsyncThunk(
  "reviews/fetchSingleReview",
  async (reviewId, thunkAPI) => {
    return fetchSingleReviewThunk(`/reviews/${reviewId}`, thunkAPI);
  }
);

export const createReview = createAsyncThunk(
  "reviews/createReview",
  async (review, thunkAPI) => {
    return createReviewThunk(`/reviews`, review, thunkAPI);
  }
);

export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  async (review, thunkAPI) => {
    return updateReviewThunk(`/reviews/${review.reviewId}`, review, thunkAPI);
  }
);

export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (reviewId, thunkAPI) => {
    return deleteReviewThunk(`/reviews/${reviewId}`, thunkAPI);
  }
);

export const archiveReview = createAsyncThunk(
  "reviews/archiveReview",
  async (id, thunkAPI) => {
    return archiveReviewThunk(`/reviews/archive/${id}`, thunkAPI);
  }
);

export const unarchiveReview = createAsyncThunk(
  "reviews/unarchiveReview",
  async (id, thunkAPI) => {
    return unarchiveReviewThunk(`/reviews/unarchive/${id}`, thunkAPI);
  }
);

const reviewsSlice = createSlice({
  name: "reviews",
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
      state.product = action.payload.product;
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    togggleActionConfirmModal: (state) => {
      state.actionConfirmModal = !state.actionConfirmModal;
    },
  },
  extraReducers: {
    [fetchReviews.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchReviews.fulfilled]: (state, action) => {
      const { reviews, totalPages, totalReviews } = action.payload;
      state.reviews = reviews;
      state.totalPages = Math.ceil(
        reviews.filter(
          (review) => review.isArchived === false && review.isDeleted === false
        ).length / 10
      );
      state.totalReviews = reviews.filter(
        (review) => review.isArchived === false && review.isDeleted === false
      ).length;
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
      toast.success("Review created successfully!");
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
      toast.success("Review updated successfully");
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
      toast.success("Review deleted successfully");
    },
    [deleteReview.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [fetchUserReviews.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchUserReviews.fulfilled]: (state, action) => {
      state.userReviews = action.payload.userReviews;
      state.pages = action.payload.pages;
      state.isLoading = false;
    },
    [fetchUserReviews.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [archiveReview.pending]: (state) => {
      state.isLoading = true;
    },
    [archiveReview.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success("Review archived successfully");
    },
    [archiveReview.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [unarchiveReview.pending]: (state) => {
      state.isLoading = true;
    },
    [unarchiveReview.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success("Review unarchived successfully");
    },
    [unarchiveReview.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [fetchSingleReview.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchSingleReview.fulfilled]: (state, action) => {
      state.review = action.payload.review;
      state.isLoading = false;
    },
    [fetchSingleReview.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
  },
});

export const {
  handleChange,
  clearValues,
  setReviewValues,
  togggleActionConfirmModal,
} = reviewsSlice.actions;

export default reviewsSlice.reducer;
