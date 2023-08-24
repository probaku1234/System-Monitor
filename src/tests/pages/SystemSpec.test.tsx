import SystemSpec from "../../pages/SystemSpec";
import { renderWithProviders } from "../../utils/test-utils";
import { it, describe, beforeAll, expect, vi } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { setupStore } from "../../redux/store";
import { setInfoAsync } from "../../redux/slice/systemInfoSlice";
import { mockIPC } from "@tauri-apps/api/mocks";

beforeAll(() => {
  mockIPC((cmd, _args) => {
    // simulated rust command called "add" that just adds two numbers
    if (cmd === "get_sys_info") {
      return {
        cpuName: "test cpu",
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

describe("System Spec", () => {
  it("renders Main", () => {
    renderWithProviders(<SystemSpec />);

    expect(screen.getByText(/System Spec/i)).toBeDefined();
  });

  it("should renders spinner if fetching", () => {
    renderWithProviders(<SystemSpec />);

    expect(screen.getByTestId(/loader/i)).toBeDefined();
  })

  it("renders system info", async () => {
    const store = setupStore();
    await waitFor(() => {
      store.dispatch(setInfoAsync());
    });

    console.log(store.getState().systemInfo.cpuName);
    renderWithProviders(<SystemSpec />, { store });

    expect(screen.getByText(/test cpu/i)).toBeDefined();
  });
});
