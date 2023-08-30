import SystemSpec from "../../pages/SystemSpec";
import { renderWithProviders } from "../../utils/test-utils";
import { it, describe, beforeAll, expect, vi } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { setupStore } from "../../redux/store";
import { setSpecInfoAsync } from "../../redux/slice/systemSpecInfoSlice";
import { mockIPC } from "@tauri-apps/api/mocks";

beforeAll(() => {
  mockIPC((cmd, _args) => {
    // simulated rust command called "add" that just adds two numbers
    if (cmd === "get_sys_spec_info") {
      return {
        cpuName: "test cpu",
        gpuName: "test gpu",
        motherboardName: "test motherboard",
        diskInfo: [
          {
            diskAlpha: "C",
            model: "disk A",
            percent: 39,
            totalSpace: "39",
            usedSpace: "10",
          },
        ],
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
  });

  it("renders system info", async () => {
    const store = setupStore();
    await waitFor(() => {
      store.dispatch(setSpecInfoAsync());
    });

    renderWithProviders(<SystemSpec />, { store });

    expect(screen.getByText(/test cpu/i)).toBeDefined();
  });
});
