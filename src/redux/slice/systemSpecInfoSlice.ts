import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { fetchSystemSpecInfo } from "./systemSpecInfoAPI";

export interface SystemSpecState {
  cpuName: string;
  gpuName: string;
  motherboardName: string;
  diskInfo: DiskInfoState[];
  fetching: boolean;
  error?: string;
}

export interface DiskInfoState {
  model: string;
  diskAlpha: string;
  usedSpace: string;
  totalSpace: string;
  percent: number;
}

const initialState: SystemSpecState = {
  cpuName: "",
  gpuName: "",
  motherboardName: "",
  diskInfo: [],
  fetching: true,
  error: "",
};

export const setSpecInfoAsync = createAsyncThunk("fetchSystemSpecInfo", async () => {
  const response = await fetchSystemSpecInfo();

  return response;
});

export const systemSpecInfoSlice = createSlice({
  name: "systemInfoSpec",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(setSpecInfoAsync.fulfilled, (state, action) => {
      console.log(action.payload);
      return {
        ...action.payload,
        fetching: false,
        error: "",
      };
    });
    builder.addCase(setSpecInfoAsync.rejected, (state, error) => {
      state.fetching = false;
      state.error = error.error.message;
    });
  },
});

export const selectSystemSpecInfo = (state: RootState) => state.systemInfoSpec;

export default systemSpecInfoSlice.reducer;
