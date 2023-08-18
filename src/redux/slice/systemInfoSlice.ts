import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { fetchSystemInfo } from "./systemInfoAPI";

export interface SystemInfoState {
  cpu_name: string;
  used_memory: number;
  total_memory: number;
  gpu_name: string;
  gpu_temp: number;
  gpu_load: number;
  fetching: boolean;
  error?: string;
}

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
      state.cpu_name = action.payload.cpu_name;
      state.used_memory = action.payload.used_memory;
      state.total_memory = action.payload.total_memory;
      state.gpu_name = action.payload.gpu_name;
      state.gpu_temp = action.payload.gpu_temp;
      state.gpu_load = action.payload.gpu_load;
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
