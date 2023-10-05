import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: {},
};

const userReducer = createSlice({
  name: "UserStatus",
  initialState,
  reducers: {
    VERIFY_LOGIN_EMAIL_PASSWORD: (state, action) => {
      state.isAuthenticated = false;
      state.loading = true;
    },

    LOGIN_SUCCESS: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },

    LOGIN_FAIL: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },

    LOAD_USER_REQUEST: (state, action) => {
      state.isAuthenticated = false;
      state.loading = true;
    },

    LOAD_USER_SUCCESS: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },

    LOAD_USER_FAIL: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },

    LOGOUT_REQUEST: (state, action) => {
      state.isAuthenticated = true;
      state.loading = true;
    },

    LOGOUT_SUCCESS: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },

    LOGOUT_FAIL: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.error = action.payload;
    },

    REGISTER_USER_REQUEST: (state, action) => {
      state.user = {}
      state.isAuthenticated = false;
      state.loading = true;
    },

    REGISTER_USER_SUCCESS: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },

    REGISTER_USER_FAIL: (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  VERIFY_LOGIN_EMAIL_PASSWORD,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_REQUEST,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL
} = userReducer.actions;
export default userReducer.reducer;
