import { ADD_TO_CART, REMOVE_ITEM, SAVE_SHIPPING_INFO, UPDATE_CART } from "../reducer/cartReducer";
import axios from "axios";

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
    
  const { data } = await axios.get(`/api/v1/product/${id}`);
  dispatch(
    ADD_TO_CART({
      product: data.productDetails._id,
      name: data.productDetails.name,
      price: data.productDetails.price,
      image: data.productDetails.images?.[0]?.url,
      stock: data.productDetails.stock,
      quantity,
    })
  );

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
};


export const updateQuantityInCart = (id, quantity) => async (dispatch, getState) => {
  
  console.log(id, quantity)

  dispatch(
    UPDATE_CART({
      product_id: id,
      quantity,
    })
  );

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
};

export const RemoveProductFromCart = (id) => async (dispatch, getState) => {

  dispatch(
    REMOVE_ITEM(id)
  );

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
};

export const saveShippingInformation = (shippingData) => async (dispatch, getState) => {

  const shippingInfo = {...shippingData, "address": `${shippingData.flat}, ${shippingData.address}, ${shippingData.landmark}`}
  delete shippingInfo.flat
  delete shippingInfo.landmark

  console.log(shippingInfo)

  dispatch(SAVE_SHIPPING_INFO(shippingInfo))

  localStorage.setItem('shippingInfo', JSON.stringify(getState().cart.shippingInfo))
};