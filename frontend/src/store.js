import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducers from "./reducer/productReducers";
import productDetailReducers from "./reducer/productDetailReducer";
import sidebarReducer from "./reducer/sidebarReducer";
import userReducer from "./reducer/userReducer";
import updateUserReducer from "./reducer/updateUserReducer";
import cartReducer from "./reducer/cartReducer";

const reducer = combineReducers({
  products: productReducers,
  productDetails: productDetailReducers,
  sidebarStatus: sidebarReducer,
  user: userReducer,
  updateUser: updateUserReducer,
  cart: cartReducer
});

export const store = configureStore({
  reducer,
});
