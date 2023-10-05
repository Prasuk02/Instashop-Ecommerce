import axios from "axios";
import {
  FETCH_PRODUCT_FAIL,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
} from "../reducer/productReducers";

export const getProducts = (keyword = "", category, rating, priceRange) => async (dispatch) => {
  try {

    dispatch(FETCH_PRODUCT_REQUEST());

    let fetchLink = `/api/v1/products?keyword=${keyword}`
    if(category){
      fetchLink = `${fetchLink}&category=${category.toLowerCase()}`
    }
    if(rating){
      fetchLink = `${fetchLink}&rating[gte]=${rating}`
    }
    if(priceRange){
      fetchLink = `${fetchLink}&price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}`
    }
    const { data } = await axios.get(fetchLink);

    dispatch(FETCH_PRODUCT_SUCCESS(data));

  } catch (error) {

    dispatch(FETCH_PRODUCT_FAIL(error.message));

  }
};
