import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  updateStatus: false,
};

const updateUserReducer = createSlice({
  name: "updateUser",
  initialState,
  reducers: {
    UPDATE_PROFILE_REQUEST: (state, action) => {
      (state.loading = true), (state.updateStatus = false);
    },

    UPDATE_PROFILE_SUCCESS: (state, action) => {
      (state.loading = false), (state.updateStatus = action.payload.success);
    },

    UPDATE_PROFILE_FAIL: (state, action) => {
      (state.loading = false), (state.updateStatus = false);
    },

    UPDATE_PASSWORD_REQUEST: (state, action) => {
      (state.loading = true), (state.updateStatus = false);
    },

    UPDATE_PASSWORD_SUCCESS: (state, action) => {
      (state.loading = false), (state.updateStatus = action.payload.success);
    },

    UPDATE_PASSWORD_FAIL: (state, action) => {
      state.loading = false
      state.updateStatus = false
      state.error = action.payload
    },
  },
});

export const {
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
} = updateUserReducer.actions;
export default updateUserReducer.reducer;
