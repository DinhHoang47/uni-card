import { createSlice } from "@reduxjs/toolkit";

const commonMessageSlice = createSlice({
  name: "messageModal",
  initialState: {
    messageArray: [],
  },
  reducers: {
    addMessage: (state, action) => {
      state.messageArray.push(action.payload);
    },
    removeMessage: (state) => {
      state.messageArray.pop();
    },
  },
});

export const { addMessage, removeMessage } = commonMessageSlice.actions;
export default commonMessageSlice.reducer;
export const selectCommonMessage = () => state.messageModal;
