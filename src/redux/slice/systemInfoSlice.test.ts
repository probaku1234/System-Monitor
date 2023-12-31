import systemInfoReducer, {
  SystemInfoState,
  setInfoAsync,
} from "./systemInfoSlice";
import { it, describe, expect } from "vitest";
import { AnyAction } from "@reduxjs/toolkit";

describe("system info reducer", () => {
  const initialState: SystemInfoState = {
    cpuTemp: 0,
    cpuLoad: 0,
    usedMemory: 0,
    totalMemory: 0,
    gpuTemp: 0,
    gpuLoad: 0,
    processInfo: [],
    fetching: true,
    error: "",
  };

  it("should handle initial state", async () => {
    expect(systemInfoReducer(undefined, { type: "unknown" })).toEqual({
      cpuTemp: 0,
      cpuLoad: 0,
      usedMemory: 0,
      totalMemory: 0,
      gpuTemp: 0,
      gpuLoad: 0,
      processInfo: [],
      fetching: true,
      error: "",
    });
  });

  it("should set fetching true when setInfoAsync is pending", async () => {
    const action: AnyAction = { type: setInfoAsync.pending.type };
    const actual = systemInfoReducer(initialState, action);
    expect(actual).toEqual({
      cpuTemp: 0,
      cpuLoad: 0,
      usedMemory: 0,
      totalMemory: 0,
      gpuTemp: 0,
      gpuLoad: 0,
      processInfo: [],
      fetching: true,
      error: "",
    });
  });

  it("should update system info when setInfoAsync is fulfilled", () => {
    const mockPayload = {
      cpuTemp: 60,
      cpuLoad: 60,
      usedMemory: 30,
      totalMemory: 60,
      gpuTemp: 30,
      gpuLoad: 30,
    };
    const action: AnyAction = {
      type: setInfoAsync.fulfilled.type,
      payload: mockPayload,
    };
    const actual = systemInfoReducer(initialState, action);
    expect(actual).toEqual({
      ...mockPayload,
      fetching: false,
      error: "",
    });
  });

  it("should set fetching false and error when setInfoAsync is rejected", () => {
    const action: AnyAction = {
      type: setInfoAsync.fulfilled.type,
      payload: {
        error: {
          message: "error message",
        },
      },
    };
    const actual = systemInfoReducer(initialState, action);
    expect(actual.fetching).toEqual(false);
  });
});
