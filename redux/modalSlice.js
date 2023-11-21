import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isAddNewCollectionModalOpen: false,
    isUserSettingOpen: false,
    isAPIKeyInputOpen: false,
  },
  reducers: {
    openAddNewCollectionModal: (state, action) => {
      state.isAddNewCollectionModalOpen = true;
    },
    closeAddNewCollectionModal: (state) => {
      state.isAddNewCollectionModalOpen = false;
    },
    openUserSetting: (state) => {
      state.isUserSettingOpen = true;
    },
    closeUserSetting: (state) => {
      state.isUserSettingOpen = false;
    },
    openAPIKeyInput: (state) => {
      state.isAPIKeyInputOpen = true;
    },
    closeAPIKeyInput: (state) => {
      state.isAPIKeyInputOpen = false;
    },
  },
});

export const {
  openAddNewCollectionModal,
  closeAddNewCollectionModal,
  openUserSetting,
  closeUserSetting,
  openAPIKeyInput,
  closeAPIKeyInput,
} = modalSlice.actions;
export default modalSlice.reducer;
