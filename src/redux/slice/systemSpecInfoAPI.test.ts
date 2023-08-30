import { mockIPC } from "@tauri-apps/api/mocks";
import { it, describe, beforeAll, expect, vi } from "vitest";
import { fetchSystemSpecInfo } from "./systemSpecInfoAPI";

beforeAll(() => {
  mockIPC((cmd, _args) => {
    if (cmd == "get_sys_spec_info") {
      return {
        cpuName: "",
        gpuName: "",
        motherboardName: "",
        diskInfo: [],
        fetching: true,
        error: "",
      };
    }
  });
});

describe("systemInfoSpecAPI", async () => {
  it("should fetch system info spec", () => {
    const spy = vi.spyOn(window, "__TAURI_IPC__");

    expect(fetchSystemSpecInfo()).resolves.toStrictEqual({
      cpuName: "",
      gpuName: "",
      motherboardName: "",
      diskInfo: [],
      fetching: true,
      error: "",
    });
    expect(spy).toHaveBeenCalled();
  });
});
