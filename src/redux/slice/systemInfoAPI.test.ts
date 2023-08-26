import { mockIPC } from "@tauri-apps/api/mocks";
import { it, describe, beforeAll, expect, vi } from "vitest";
import { fetchSystemInfo } from "./systemInfoAPI";

beforeAll(() => {
  mockIPC((cmd, _args) => {
    // simulated rust command called "add" that just adds two numbers
    if (cmd === "get_sys_info") {
      return {
        cpuName: "test cpu",
        cpuTemp: 30,
        cpuLoad: 30,
        usedMemory: 1,
        totalMemory: 5,
        gpuName: "test gpu",
        gpuTemp: 60,
        gpuLoad: 5,
        fetching: false,
        error: "",
      };
    }
  });
});

describe("systemInfoAPI", async () => {
  it("should fetch system info", () => {
    const spy = vi.spyOn(window, "__TAURI_IPC__");

    expect(fetchSystemInfo()).resolves.toStrictEqual({
      cpuName: "test cpu",
      cpuTemp: 30,
      cpuLoad: 30,
      usedMemory: 1,
      totalMemory: 5,
      gpuName: "test gpu",
      gpuTemp: 60,
      gpuLoad: 5,
      fetching: false,
      error: "",
    });
    expect(spy).toHaveBeenCalled();
  });
});
