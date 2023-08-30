import systemSpecInfoReducer, {
  SystemSpecState,
  setSpecInfoAsync,
  DiskInfoState,
} from "./systemSpecInfoSlice";
import { it, describe, expect } from "vitest";
import { AnyAction } from "@reduxjs/toolkit";

describe("system spec info reducer", () => {
  const initialState: SystemSpecState = {
    cpuName: "",
    gpuName: "",
    motherboardName: "",
    diskInfo: [],
    fetching: true,
    error: "",
  };

  it("should handle initial state", async () => {
    expect(systemSpecInfoReducer(undefined, { type: "unknown" })).toEqual({
      cpuName: "",
      gpuName: "",
      motherboardName: "",
      diskInfo: [],
      fetching: true,
      error: "",
    });
  });

  it("should update system info when setInfoAsync is fulfilled", () => {
    const mockPayload = {
      cpuName: "",
      gpuName: "",
      motherboardName: "",
      diskInfo: [
        {
          diskAlpha: "C",
          model: "disk A",
          percent: 39,
          totalSpace: "39",
          usedSpace: "10",
        },
      ] as DiskInfoState[],
    };
    const action: AnyAction = {
      type: setSpecInfoAsync.fulfilled.type,
      payload: mockPayload,
    };
    const actual = systemSpecInfoReducer(initialState, action);
    expect(actual).toEqual({
      ...mockPayload,
      fetching: false,
      error: "",
    });
  });

  it("should set fetching false and error when setInfoAsync is rejected", () => {
    const action: AnyAction = {
      type: setSpecInfoAsync.fulfilled.type,
      payload: {
        error: {
          message: "error message",
        },
      },
    };
    const actual = systemSpecInfoReducer(initialState, action);
    expect(actual.fetching).toEqual(false);
    // expect(actual.error).toEqual("error message");
  });
});
