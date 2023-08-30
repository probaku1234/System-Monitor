import Monitoring from "../../pages/Monitoring";
import { renderWithProviders } from "../../utils/test-utils";
import { it, describe, beforeAll, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { setupStore } from "../../redux/store";
import { setInfoAsync } from "../../redux/slice/systemInfoSlice";
import { mockIPC } from "@tauri-apps/api/mocks";

beforeAll(() => {
  mockIPC((cmd, _args) => {
    // simulated rust command called "add" that just adds two numbers
    if (cmd === "get_sys_info") {
      return {
        cpuName: "test cpu",
        cpuTemp: 50,
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

describe("Monitoring", () => {
  it("renders Monitoring", () => {
    renderWithProviders(<Monitoring />);

    expect(screen.getByText(/Monitoring/i)).toBeDefined();
  });

  it("should renders spinner if fetching", () => {
    renderWithProviders(<Monitoring />);

    expect(screen.getByTestId(/loader/i)).toBeDefined();
  });

  it("renders system info", async () => {
    const store = setupStore();
    await waitFor(() => {
      store.dispatch(setInfoAsync());
    });

    renderWithProviders(<Monitoring />, { store });

    expect(screen.getByText(/60/i)).toBeDefined();
    expect(screen.getByText(/20%/i)).toBeDefined();
  });
});
