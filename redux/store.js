"use client";
import { configureStore } from "@reduxjs/toolkit";
import authModalReducer from "./authModalSlice";
import authReducer from "./authSlice";
import thunk from "redux-thunk";
import rightSideBarReducer from "./rightSideBarSlice";

export const store = configureStore({
  reducer: {
    authModal: authModalReducer,
    auth: authReducer,
    rightSidebar: rightSideBarReducer,
  },
  middleware: [thunk],
  devTools: true,
});
