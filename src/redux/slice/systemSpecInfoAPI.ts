import { invoke } from "@tauri-apps/api/tauri";
import { SystemSpecState } from "./systemSpecInfoSlice";

export async function fetchSystemSpecInfo(): Promise<SystemSpecState> {
    return invoke("get_sys_spec_info");
}