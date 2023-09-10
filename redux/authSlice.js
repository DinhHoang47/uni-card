"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    logOut(state) {},
  },
});

export const { setUserInfo } = authSlice.actions;
export default authSlice.reducer;
