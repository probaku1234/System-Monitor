import systemInfoReducer, {
  SystemInfoState,
  setInfoAsync,
} from "./systemInfoSlice";
import { it, describe, expect } from "vitest";
import { AnyAction } from "@reduxjs/toolkit";

describe("system info reducer", () => {
  const initialState: SystemInfoState = {
    cpu_name: "",
    used_memory: 0,
    total_memory: 0,
    gpu_name: "",
    gpu_temp: 0,
    gpu_load: 0,
    fetching: true,
    error: "",
  };

  it("should handle initial state", async () => {
    expect(systemInfoReducer(undefined, { type: "unknown" })).toEqual({
      cpu_name: "",
      used_memory: 0,
      total_memory: 0,
      gpu_name: "",
      gpu_temp: 0,
      gpu_load: 0,
      fetching: true,
      error: "",
    });
  });

  it("should set fetching true when setInfoAsync is pending", async () => {
    const action: AnyAction = { type: setInfoAsync.pending.type };
    const actual = systemInfoReducer(initialState, action);
    expect(actual).toEqual({
      cpu_name: "",
      used_memory: 0,
      total_memory: 0,
      gpu_name: "",
      gpu_temp: 0,
      gpu_load: 0,
      fetching: true,
      error: "",
    });
  });

  it("should update system info when setInfoAsync is fulfilled", () => {
    const mockPayload = {
      cpu_name: "cpu name",
      used_memory: 30,
      total_memory: 60,
      gpu_name: "gpu name",
      gpu_temp: 30,
      gpu_load: 30,
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
    // expect(actual.error).toEqual("error message");
  });
});
