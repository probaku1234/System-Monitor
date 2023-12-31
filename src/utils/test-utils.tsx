import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import type { AppStore, RootState } from "../redux/store";
// As a basic setup, import your same slice reducers
import currentPageReducer from "../redux/slice/currentPageSlice";
import systemInfoReducer from "../redux/slice/systemInfoSlice";
import systemSpecInfoReducer from "../redux/slice/systemSpecInfoSlice";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {
      currentPage: {
        value: "home",
      },
      systemInfo: {
        cpuTemp: 0,
        cpuLoad: 0,
        usedMemory: 0,
        totalMemory: 0,
        gpuLoad: 0,
        gpuTemp: 0,
        fetching: true,
      },
      systemInfoSpec: {
        cpuName: "",
        gpuName: "",
        motherboardName: "",
        diskInfo: [],
        fetching: true,
      },
    },
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        currentPage: currentPageReducer,
        systemInfo: systemInfoReducer,
        systemInfoSpec: systemSpecInfoReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
