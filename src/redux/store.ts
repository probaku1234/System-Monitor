import {
  configureStore,
  ThunkAction,
  Action,
  PreloadedState,
} from "@reduxjs/toolkit";
import currentPageReducer from "./slice/currentPageSlice";
import systemInfoReducer from "./slice/systemInfoSlice";
import systemSpecInfoReducer from "./slice/systemSpecInfoSlice";

export const store = configureStore({
  reducer: {
    currentPage: currentPageReducer,
    systemInfo: systemInfoReducer,
    systemInfoSpec: systemSpecInfoReducer,
  },
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: {
      currentPage: currentPageReducer,
      systemInfo: systemInfoReducer,
      systemInfoSpec: systemSpecInfoReducer,
    },
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
