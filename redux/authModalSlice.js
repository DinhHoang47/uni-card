"use client";
import { createSlice } from "@reduxjs/toolkit";

export const authModalSlice = createSlice({
  name: "authModal",
  initialState: {
    isOpen: false,
  },
  reducers: {
    open: (state) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    },
  },
});

export const { open, close } = authModalSlice.actions;
export default authModalSlice.reducer;
export const selectAuthModal = () => state.authModal;
