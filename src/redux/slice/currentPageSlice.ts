import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface CurrentPageState {
  value: "home" | "system_spec" | "monitoring";
}

const initialState: CurrentPageState = {
  value: "home",
};

export const currentPageSlice = createSlice({
  name: "currentPage",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCurrentPage } = currentPageSlice.actions;

export const selectCurrentPage = (state: RootState) => state.currentPage.value;

export default currentPageSlice.reducer;
