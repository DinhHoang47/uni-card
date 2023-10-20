import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isAddNewCollectionModalOpen: false,
  },
  reducers: {
    openAddNewCollectionModal: (state, action) => {
      state.isAddNewCollectionModalOpen = true;
    },
    closeAddNewCollectionModal: (state) => {
      state.isAddNewCollectionModalOpen = false;
    },
  },
});

export const { openAddNewCollectionModal, closeAddNewCollectionModal } =
  modalSlice.actions;
export default modalSlice.reducer;
