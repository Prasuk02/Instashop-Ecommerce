import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebar: false,
};

const sidebarReducer = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    CHANGE_SIDEBAR_STATUS: (state, action) => {
      state.sidebar = !state.sidebar;
    }
  },
});

export const { CHANGE_SIDEBAR_STATUS } = sidebarReducer.actions
export default sidebarReducer.reducer 