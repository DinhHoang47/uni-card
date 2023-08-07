"use client";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authModalSlice";

export default configureStore({
  reducer: { authModal: authReducer },
});
