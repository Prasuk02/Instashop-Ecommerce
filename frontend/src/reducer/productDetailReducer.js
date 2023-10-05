import { createSlice } from "@reduxjs/toolkit";

const productDetailReducers = createSlice({
  name: "singleProductReducer",
  initialState: {
    product: {},
  },
  reducers: {
    FETCH_SINGLE_PRODUCT_REQUEST: (state, action) => {
      state.loading = true;
      state.product = {};
    },

    FETCH_SINGLE_PRODUCT_SUCCESS: (state, action) => {
      state.loading = false;
      state.product = action.payload.productDetails;
    },

    FETCH_SINGLE_PRODUCT_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    CLEAR_ERRORS: (state, action) => {
      state.error = null;
    },
  },
});

export const {
  FETCH_SINGLE_PRODUCT_FAIL,
  FETCH_SINGLE_PRODUCT_SUCCESS,
  FETCH_SINGLE_PRODUCT_REQUEST,
  CLEAR_ERRORS,
} = productDetailReducers.actions;

export default productDetailReducers.reducer;
