import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: true,
  productCount: 0,
  error: null,
};

const productReducers = createSlice({
  name: "products",
  initialState,
  reducers: {
    FETCH_PRODUCT_REQUEST: (state, action) => {
      state.loading = true;
      state.products = [];
    },

    FETCH_PRODUCT_SUCCESS: (state, action) => {
      state.loading = false;
      state.products = action.payload.allProducts;
      state.productCount = action.payload.productCount;
    },

    FETCH_PRODUCT_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    CLEAR_ERRORS: (state, action) => {
      state.error = null;
    },
  },
});

export const {
  FETCH_PRODUCT_FAIL,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  CLEAR_ERRORS,
} = productReducers.actions;

export default productReducers.reducer;
