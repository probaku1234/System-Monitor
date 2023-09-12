import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { fetchSystemInfo } from "./systemInfoAPI";

export interface SystemInfoState {
  // cpuName: string;
  cpuTemp: number;
  cpuLoad: number;
  usedMemory: number;
  totalMemory: number;
  // gpuName: string;
  gpuTemp: number;
  gpuLoad: number;
  // motherboardName: string;
  processInfo: ProcessInfoState[];
  fetching: boolean;
  error?: string;
}

export interface ProcessInfoState {
  name: string;
  cpuUsage: number;
  memoryUsage: number;
}

const initialState: SystemInfoState = {
  // cpuName: "",
  cpuTemp: 0,
  cpuLoad: 0,
  usedMemory: 0,
  totalMemory: 0,
  // gpuName: "",
  gpuTemp: 0,
  gpuLoad: 0,
  // motherboardName: "",
  processInfo: [],
  fetching: true,
  error: "",
};

export const setInfoAsync = createAsyncThunk("fetchSystemInfo", async () => {
  const response = await fetchSystemInfo();

  return response;
});

export const systemInfoSlice = createSlice({
  name: "systemInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(setInfoAsync.pending, (state) => {
    //   state.fetching = true;
    // });
    builder.addCase(setInfoAsync.fulfilled, (_state, action) => {
      console.log(action.payload);
      // state.cpuName = action.payload.cpuName;
      // state.cpuTemp = action.payload.cpuTemp;
      // state.cpuLoad = action.payload.cpuLoad;
      // state.usedMemory = action.payload.usedMemory;
      // state.totalMemory = action.payload.totalMemory;
      // state.gpuName = action.payload.gpuName;
      // state.gpuTemp = action.payload.gpuTemp;
      // state.gpuLoad = action.payload.gpuLoad;
      // state.fetching = false;
      return {
        ...action.payload,
        fetching: false,
        error: "",
      };
    });
    builder.addCase(setInfoAsync.rejected, (state, error) => {
      state.fetching = false;
      state.error = error.error.message;
    });
  },
});

export const selectSystemInfo = (state: RootState) => state.systemInfo;

export default systemInfoSlice.reducer;
