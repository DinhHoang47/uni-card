"use client";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authModalSlice";

export const store = configureStore({
  reducer: { authModal: authReducer },
  devTools: true,
});
