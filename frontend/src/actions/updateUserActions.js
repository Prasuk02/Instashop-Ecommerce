import axios from "axios";
import {
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
} from "../reducer/updateUserReducer";

export const updateUserDetails = (userData) => async (dispatch) => {
  try {
    dispatch(UPDATE_PROFILE_REQUEST());

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.put("/api/v1/me/update", userData, config);
    console.log(data);

    dispatch(UPDATE_PROFILE_SUCCESS(data));
  } catch (error) {
    dispatch(UPDATE_PROFILE_FAIL(error.response.data.message));
  }
};

export const updateUserPassword = (userData) => async (dispatch) => {
  try {
    dispatch(UPDATE_PASSWORD_REQUEST());

    console.log(userData)
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      "/api/v1/password/update",
      userData,
      config
    );
    console.log(data);

    dispatch(UPDATE_PASSWORD_SUCCESS(data));
  } catch (error) {
    dispatch(UPDATE_PASSWORD_FAIL(error.response.data.message));
  }
};
