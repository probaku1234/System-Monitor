import { invoke } from "@tauri-apps/api/tauri";
import { SystemInfoState } from "./systemInfoSlice";

export async function fetchSystemInfo(): Promise<SystemInfoState> {
  return invoke("get_sys_info");
}
