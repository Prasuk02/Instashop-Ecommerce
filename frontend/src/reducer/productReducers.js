import { createSlice } from "@reduxjs/toolkit";
import {
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAIL,
} from "../constants/productConstants";

export const productReducers = createSlice({
  name: "products",
  initialState: {
    products: [],
    // loading: true,
    // productCount: 0
  },
  reducers: {
    [FETCH_PRODUCT_REQUEST](state, action){
      // loading: true,
      state.products = [];
    },

    [FETCH_PRODUCT_SUCCESS](state, action) {
      // loading: false,
      state.products.push(action.payload.allProducts);
      // productCount: 50
    },

    [FETCH_PRODUCT_FAIL]: (state, action) => {
      (state.loading = false),
        (state.error = action.payload),
        (state.productCount = action.payload.products.productCount);
    },
  },
});
