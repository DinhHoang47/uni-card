"use client";
import { configureStore } from "@reduxjs/toolkit";
import authModalReducer from "./authModalSlice";
import authReducer from "./authSlice";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: { authModal: authModalReducer, auth: authReducer },
  middleware: [thunk],
  devTools: true,
});
