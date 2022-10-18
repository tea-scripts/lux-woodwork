import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  createProductThunk,
  deleteProductThunk,
  fetchAllProductsThunk,
  fetchSingleProductReviewsThunk,
  fetchProductThunk,
  updateProductThunk,
  uploadProductImageThunk,
} from './productsThunk';

const initialState = {
  products: [],
  product: {},
  isLoading: false,
  productId: '',
  name: '',
  price: 0,
  inventory: 0,
  category: '',
  featured: false,
  freeShipping: false,
  description: '',
  image: '',
  isViewing: false,
  displayProduct: false,
  isEditingProduct: false,
  product_name: '',
  page: 1,
  totalPages: 0,
  totalProducts: 0,
  totalReviewPages: 0,
  reviewPage: 1,
  totalReviews: 0,
  searchField: '',
  filteredProducts: [],
  productReviews: [],
};

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (product, thunkAPI) => {
    return createProductThunk('/products', product, thunkAPI);
  }
);

export const uploadProductImage = createAsyncThunk(
  'products/uploadProductImage',
  async (formData, thunkAPI) => {
    return uploadProductImageThunk('/products/uploadImage', formData, thunkAPI);
  }
);

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async (_, thunkAPI) => {
    return fetchAllProductsThunk(
      `/products?page${thunkAPI.getState().products.page}`,
      thunkAPI
    );
  }
);

export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (productId, thunkAPI) => {
    return fetchProductThunk(`/products/${productId}`, thunkAPI);
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (product, thunkAPI) => {
    return updateProductThunk(
      `/products/${product.productId}`,
      product,
      thunkAPI
    );
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, thunkAPI) => {
    return deleteProductThunk(`/products/${id}`, thunkAPI);
  }
);

export const fetchSingleProductReviews = createAsyncThunk(
  'products/fetchSingleProductReviews',
  async (productId, thunkAPI) => {
    return fetchSingleProductReviewsThunk(
      `/products/${productId}/reviews?page=${
        thunkAPI.getState().products.reviewPage
      }`,
      thunkAPI
    );
  }
);

const productsSlice = createSlice({
  name: 'products',
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
    toggleProductView: (state) => {
      state.isViewing = !state.isViewing;
    },
    toggleProductEdit: (state) => {
      state.isEditingProduct = !state.isEditingProduct;
    },
    setProductValues: (state, { payload }) => {
      state.productId = payload._id;
      state.name = payload.name;
      state.price = payload.price;
      state.inventory = payload.inventory;
      state.category = payload.category;
      state.featured = payload.featured;
      state.freeShipping = payload.freeShipping;
      state.description = payload.description;
      state.image = payload.image;
      state.displayProduct = payload.displayProduct;
      state.product_name = payload.product_name;
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
  },
  extraReducers: {
    [fetchAllProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchAllProducts.fulfilled]: (state, action) => {
      const { products, totalPages, totalProducts } = action.payload;
      state.products = products;
      state.totalPages = totalPages;
      state.totalProducts = totalProducts;
      state.isLoading = false;
    },
    [fetchAllProducts.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [fetchProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchProduct.fulfilled]: (state, action) => {
      state.product = action.payload.product;
      state.isLoading = false;
    },
    [fetchProduct.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [uploadProductImage.pending]: (state) => {
      state.isLoading = true;
    },
    [uploadProductImage.fulfilled]: (state, action) => {
      state.image = action.payload.image.src;
      state.isLoading = false;
      toast.success('Image uploaded successfully');
    },
    [uploadProductImage.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [createProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [createProduct.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success('Product created successfully');
    },
    [createProduct.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [updateProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [updateProduct.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success('Product updated successfully');
    },
    [updateProduct.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [deleteProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteProduct.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success('Product deleted successfully');
    },
    [deleteProduct.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [fetchSingleProductReviews.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchSingleProductReviews.fulfilled]: (state, action) => {
      const { reviews, totalPages, totalReviews } = action.payload;
      state.productReviews = reviews;
      state.totalReviewPages = totalPages;
      state.totalReviews = totalReviews;
      state.isLoading = false;
    },
    [fetchSingleProductReviews.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
  },
});

export const {
  handleChange,
  clearValues,
  toggleProductView,
  setProductValues,
  toggleProductEdit,
  changePage,
} = productsSlice.actions;

export default productsSlice.reducer;
