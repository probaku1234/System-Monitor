import Main from "../../pages/Main";
import { renderWithProviders } from "../../utils/test-utils";
import { it, describe, expect } from "vitest";
import { screen } from "@testing-library/react";

describe("Main", () => {
  it("renders Main", () => {
    renderWithProviders(<Main />);

    expect(screen.getByText(/Welcome to Tauri!/i)).toBeDefined();
  });
});
