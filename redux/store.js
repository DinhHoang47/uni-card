"use client";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import authModalReducer from "./authModalSlice";
import authReducer from "./authSlice";
import rightSideBarReducer from "./rightSideBarSlice";
import commonMessageReducer from "./commonMessageSlice";

export const store = configureStore({
  reducer: {
    authModal: authModalReducer,
    auth: authReducer,
    rightSidebar: rightSideBarReducer,
    commonMessage: commonMessageReducer,
  },
  middleware: [thunk],
  devTools: true,
});
