"use client";
import { createSlice } from "@reduxjs/toolkit";

export const authModalSlice = createSlice({
  name: "authModal",
  initialState: {
    value: false,
  },
  reducers: {
    open: (state) => {
      state.value = true;
    },
    close: () => {
      state.value = false;
    },
  },
});

export const { open, close } = authModalSlice.actions;
export default authModalSlice.reducer;
