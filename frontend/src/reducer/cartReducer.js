import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingInfo: localStorage.getItem("shippingInfo")
  ? JSON.parse(localStorage.getItem("shippingInfo"))
  : {},
};

const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    ADD_TO_CART: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cartItems.find((cartItem) => {
        if (item.product === cartItem.product) {
          return true;
        }
      });

      if (isItemExist) {
        state.cartItems = state.cartItems.map((cartItem) => {
          if (cartItem.product === item.product) {
            return item;
          }
          return cartItem;
        });
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    },

    UPDATE_CART: (state, action) => {
      const updatedQuantity = action.payload.quantity
      const product_id = action.payload.product_id
      console.log(updatedQuantity)
      console.log(product_id)
      state.cartItems = state.cartItems.map((cartItem) => {
        if(cartItem.product === product_id){
          return {...cartItem, quantity: updatedQuantity}
        }
        return cartItem
      })
    },

    REMOVE_ITEM: (state, action) => {
      const product_id = action.payload
      state.cartItems = state.cartItems.filter((cartItem) => {
        return cartItem.product != product_id
      })
    },

    SAVE_SHIPPING_INFO: (state, action) => {
      state.shippingInfo = action.payload
    }
  }
});

export const { ADD_TO_CART, UPDATE_CART, REMOVE_ITEM, SAVE_SHIPPING_INFO } = cartReducer.actions;
export default cartReducer.reducer;
