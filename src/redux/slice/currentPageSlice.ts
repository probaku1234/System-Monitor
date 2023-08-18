import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const currentPageSlice = createSlice({
  name: "currentPage",
  initialState: {
    value: "sex",
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCurrentPage } = currentPageSlice.actions;

export const selectCurrentPage = (state: RootState) => state.currentPage.value

export default currentPageSlice.reducer;
