import axios from "axios";
import {
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAIL,
} from "../constants/productConstants";

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PRODUCT_REQUEST });
    const { data } = await axios.get("/api/v1/products");

    dispatch({ 
        type: FETCH_PRODUCT_SUCCESS, 
        payload: data 
    });
  } catch (error) {
    dispatch({ 
        type: FETCH_PRODUCT_FAIL, 
        payload: error.response.data.message 
    });
  }
};
