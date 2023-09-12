import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { fetchSystemInfo } from "./systemInfoAPI";

export interface SystemInfoState {
  cpuTemp: number;
  cpuLoad: number;
  usedMemory: number;
  totalMemory: number;
  gpuTemp: number;
  gpuLoad: number;
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

export const setInfoAsync = createAsyncThunk("fetchSystemInfo", async () => {
  const response = await fetchSystemInfo();

  return response;
});

export const systemInfoSlice = createSlice({
  name: "systemInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setInfoAsync.fulfilled, (_state, action) => {
      console.log(action.payload);
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
