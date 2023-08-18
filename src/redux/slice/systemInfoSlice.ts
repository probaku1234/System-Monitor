import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { fetchSystemInfo } from "./systemInfoAPI";

export interface SystemInfoState {
  cpuName: string;
  usedMemory: number;
  totalMemory: number;
  gpuName: string;
  gpuTemp: number;
  gpuLoad: number;
  fetching: boolean;
  error?: string;
}

const initialState: SystemInfoState = {
  cpuName: "",
  usedMemory: 0,
  totalMemory: 0,
  gpuName: "",
  gpuTemp: 0,
  gpuLoad: 0,
  fetching: true,
  error: "",
};

export const setInfoAsync = createAsyncThunk("", async () => {
  const response = await fetchSystemInfo();

  return response;
});

export const systemInfoSlice = createSlice({
  name: "systemInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setInfoAsync.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(setInfoAsync.fulfilled, (state, action) => {
      state.cpuName = action.payload.cpuName;
      state.usedMemory = action.payload.usedMemory;
      state.totalMemory = action.payload.totalMemory;
      state.gpuName = action.payload.gpuName;
      state.gpuTemp = action.payload.gpuTemp;
      state.gpuLoad = action.payload.gpuLoad;
      state.fetching = false;
    });
    builder.addCase(setInfoAsync.rejected, (state, error) => {
      state.fetching = false;
      state.error = error.error.message;
    });
  },
});

export const selectSystemInfo = (state: RootState) => state.systemInfo;

export default systemInfoSlice.reducer;
