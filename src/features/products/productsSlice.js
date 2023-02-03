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
  archiveProductThunk,
  unarchiveProductThunk,
} from './productsThunk';

const initialState = {
  products: [],
  product: {},
  isLoading: false,
  productId: '',
  name: '',
  price: '',
  inventory: 0,
  category: '',
  featured: false,
  freeShipping: false,
  description: '',
  images: [],
  averageRating: 0,
  numOfReviews: 0,
  isFetchingProduct: false,
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
  actionConfirmModal: false,
  inventoryModal: false,
  deleteConfirmation: false,
  isFetchingProductReviews: false,
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
    return uploadProductImageThunk('/uploadImage', formData, thunkAPI);
  }
);

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async (_, thunkAPI) => {
    return fetchAllProductsThunk(`/products`, thunkAPI);
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

export const archiveProduct = createAsyncThunk(
  'products/archiveProduct',
  async (id, thunkAPI) => {
    return archiveProductThunk(`/products/archive/${id}`, thunkAPI);
  }
);

export const unarchiveProduct = createAsyncThunk(
  'products/unarchiveProduct',
  async (id, thunkAPI) => {
    return unarchiveProductThunk(`/products/unarchive/${id}`, thunkAPI);
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
    toggleInventoryModal: (state) => {
      state.inventoryModal = !state.inventoryModal;
    },
    toggleDeleteProduct: (state) => {
      state.deleteConfirmation = !state.deleteConfirmation;
    },
    toggleProductEdit: (state) => {
      state.isEditingProduct = !state.isEditingProduct;
    },
    setProductValues: (state, { payload }) => {
      state.productId = payload._id;
      state.name = payload.name;
      state.price = parseInt(payload.price) / 100;
      state.inventory = payload.inventory;
      state.category = payload.category;
      state.featured = payload.featured;
      state.freeShipping = payload.freeShipping;
      state.description = payload.description;
      state.images = payload.images;
      state.displayProduct = payload.displayProduct;
      state.product_name = payload.product_name;
      state.averageRating = payload.averageRating;
      state.numOfReviews = payload.numOfReviews;
    },
    clearProductValues: (state) => {
      state.productId = '';
      state.name = '';
      state.price = '';
      state.inventory = 0;
      state.category = '';
      state.featured = false;
      state.freeShipping = false;
      state.description = '';
      state.images = [];
      state.displayProduct = false;
      state.product_name = '';
      state.averageRating = 0;
      state.numOfReviews = 0;
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    togggleActionConfirmModal: (state) => {
      state.actionConfirmModal = !state.actionConfirmModal;
    },
  },
  extraReducers: {
    [fetchAllProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchAllProducts.fulfilled]: (state, action) => {
      const { products, totalPages, totalProducts } = action.payload;
      state.products = products;
      state.totalPages = Math.ceil(
        products.filter(
          (product) =>
            product.isArchived === false && product.isDeleted === false
        ).length / 10
      );
      state.totalProducts = products.filter(
        (product) => product.isArchived === false && product.isDeleted === false
      ).length;
      state.isLoading = false;
    },
    [fetchAllProducts.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [fetchProduct.pending]: (state) => {
      state.isFetchingProduct = true;
    },
    [fetchProduct.fulfilled]: (state, action) => {
      state.product = action.payload.product;
      state.isFetchingProduct = false;
    },
    [fetchProduct.rejected]: (state, action) => {
      state.isFetchingProduct = false;
      toast.error(action.payload.msg);
    },
    [uploadProductImage.pending]: (state) => {
      state.isLoading = true;
    },
    [uploadProductImage.fulfilled]: (state, action) => {
      const images = action.payload.images;
      const urls = images.map((image) => image.url);
      state.images = urls;
      state.isLoading = false;
      state.inventoryModal = false;
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
      state.actionConfirmModal = false;
      state.deleteConfirmation = false;
      toast.success('Product deleted successfully');
    },
    [deleteProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.actionConfirmModal = false;
      state.deleteConfirmation = false;
      toast.error(action.payload.msg);
    },
    [fetchSingleProductReviews.pending]: (state) => {
      state.isFetchingProductReviews = true;
    },
    [fetchSingleProductReviews.fulfilled]: (state, action) => {
      const { reviews, totalPages, totalReviews } = action.payload;
      state.productReviews = reviews;
      state.totalReviewPages = totalPages;
      state.totalReviews = totalReviews;
      state.isFetchingProductReviews = false;
    },
    [fetchSingleProductReviews.rejected]: (state, action) => {
      state.isFetchingProductReviews = false;
      toast.error(action.payload.msg);
    },
    [archiveProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [archiveProduct.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success('Product archived successfully');
    },
    [archiveProduct.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.msg);
    },
    [unarchiveProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [unarchiveProduct.fulfilled]: (state) => {
      state.isLoading = false;
      state.actionConfirmModal = false;
      toast.success('Product unarchived successfully');
    },
    [unarchiveProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.actionConfirmModal = false;
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
  togggleActionConfirmModal,
  toggleInventoryModal,
  toggleDeleteProduct,
  clearProductValues,
} = productsSlice.actions;

export default productsSlice.reducer;
