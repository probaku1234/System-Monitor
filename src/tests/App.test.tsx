import App from "../App";
import { mockIPC } from "@tauri-apps/api/mocks";
import { renderWithProviders } from "../utils/test-utils";
import { it, describe, beforeAll, expect } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { setupStore } from "../redux/store";
import { setInfoAsync } from "../redux/slice/systemInfoSlice";
import { setSpecInfoAsync } from "../redux/slice/systemSpecInfoSlice";

beforeAll(() => {
  mockIPC((cmd, _args) => {
    // simulated rust command called "add" that just adds two numbers
    if (cmd === "get_sys_info") {
      return {
        usedMemory: 1,
        totalMemory: 5,
        gpuTemp: 60,
        gpuLoad: 5,
        fetching: false,
        error: "",
      };
    }
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

describe("App", () => {
  it("renders App", () => {
    renderWithProviders(<App />);

    expect(screen.getByText(/Welcome to Tauri!/i)).toBeDefined();
  });

  it("should fetch system info", async () => {
    // const spy = vi.spyOn(window, "__TAURI_IPC__");
    // renderWithProviders(<App />);
    // await new Promise((r) => setTimeout(r, 2000));
    // await waitFor(() => {
    //   expect(spy).toHaveBeenCalled();
    // });
  });

  it("should render pages by current page", async () => {
    const store = setupStore();
    await waitFor(() => {
      store.dispatch(setInfoAsync());
      store.dispatch(setSpecInfoAsync());
    });

    renderWithProviders(<App />, { store });

    fireEvent.click(screen.getByText(/System Spec/i));
    expect(screen.getByText(/CPU/i)).toBeDefined();

    fireEvent.click(screen.getByText(/Monitoring/i));
    expect(screen.getAllByText(/Temperature/i)).toHaveLength(2);
  });
});
