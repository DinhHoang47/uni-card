import { createSlice } from "@reduxjs/toolkit";

const learningStatusSlice = createSlice({
  name: "learningStatus",
  initialState: {
    learningStatus: [{ collectionId: null, testResult: [] }],
  },
  reducers: {},
});

export default learningStatusSlice.reducer;
