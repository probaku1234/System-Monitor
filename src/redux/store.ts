import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import currentPageReducer from "./slice/currentPageSlice";

export const store = configureStore({
  reducer: {
    currentPage: currentPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
