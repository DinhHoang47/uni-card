import { createSlice } from "@reduxjs/toolkit";

export const rightSidebarSlice = createSlice({
  name: "rightSidebar",
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

export const { open, close } = rightSidebarSlice.actions;
export default rightSidebarSlice.reducer;
export const selectRightSidebar = () => state.rightSidebar;
