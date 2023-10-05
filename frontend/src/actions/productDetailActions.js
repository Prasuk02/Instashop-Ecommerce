import axios from "axios";
import {
  FETCH_SINGLE_PRODUCT_FAIL,
  FETCH_SINGLE_PRODUCT_SUCCESS,
  FETCH_SINGLE_PRODUCT_REQUEST,
} from "../reducer/productDetailReducer";

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch(FETCH_SINGLE_PRODUCT_REQUEST());

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch(FETCH_SINGLE_PRODUCT_SUCCESS(data));
  } catch (error) {
    dispatch(FETCH_SINGLE_PRODUCT_FAIL(error.message));
  }
};
