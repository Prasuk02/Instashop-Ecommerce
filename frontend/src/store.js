import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { productReducers } from "./reducer/productReducers";

const reducer = combineReducers({
    products: productReducers.reducer,
})

export const store = configureStore({
  reducer
});
