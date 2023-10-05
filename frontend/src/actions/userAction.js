import axios from "axios";
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  VERIFY_LOGIN_EMAIL_PASSWORD,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
} from "../reducer/userReducer";

//LOGIN ACTION
export const verifyLoginDetails = (email, password) => async (dispatch) => {
  try {
    dispatch(VERIFY_LOGIN_EMAIL_PASSWORD());
    const config = { headers: { "Content-Type": "application/json" } };
    console.log(email, password)
    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
      config
    );
    dispatch(LOGIN_SUCCESS(data.user));
  } catch (error) {
    dispatch(LOGIN_FAIL(error.response.data.message));
  }
};

// GET CURRENT USER ACTION
export const getCurrentUserDetails = () => async (dispatch) => {
  try {
    dispatch(LOAD_USER_REQUEST());
    const { data } = await axios.get("/api/v1/me");
    dispatch(LOAD_USER_SUCCESS(data));
  } catch (error) {
    dispatch(LOAD_USER_FAIL(error.response.data.message));
  }
};

//LOGOUT ACTION
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch(LOGOUT_REQUEST());
    const { data } = await axios.get("/api/v1/logout");

    dispatch(LOGOUT_SUCCESS());
  } catch (error) {
    dispatch(LOGOUT_FAIL(error.response.data.message));
  }
};


// REGISTER USER
export const createNewUser = (userData) => async (dispatch) => {
  try{
    dispatch(REGISTER_USER_REQUEST())

    console.log(userData)
    const config = {headers: {"Content-Type": "multipart/form-data"}}
    const {data} = await axios.post("/api/v1/register", userData, config)

    console.log(data)

    dispatch(REGISTER_USER_SUCCESS(data))
  }
  catch (error){
    dispatch(REGISTER_USER_FAIL(error.response.data.message))
  }
}