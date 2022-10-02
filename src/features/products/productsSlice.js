import { createSlice } from "@reduxjs/toolkit";
import products from "../../utils/mockProducts";

const initialState = {
  products: products,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export const {} = productsSlice.actions;

export default productsSlice.reducer;
