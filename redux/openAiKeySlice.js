import { createSlice } from "@reduxjs/toolkit";

let initialKey = undefined;
if (typeof window !== "undefined") {
  initialKey = localStorage.getItem("UC_openai_key");
}

export const openAiKeySlice = createSlice({
  name: "openAiKey",
  initialState: {
    key: initialKey,
  },
  reducers: {
    setOpenAiKey: (state, action) => {
      localStorage.setItem("UC_openai_key", action.payload);
      state.key = action.payload;
    },
    removeOpenAiKey: (state, action) => {
      localStorage.removeItem("UC_openai_key");
      state.key = null;
    },
  },
});

export const { setOpenAiKey, removeOpenAiKey } = openAiKeySlice.actions;

export default openAiKeySlice.reducer;
