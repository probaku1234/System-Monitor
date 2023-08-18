import currentPageReducer, {
  setCurrentPage,
  CurrentPageState,
} from "./currentPageSlice";
import { it, describe, expect } from "vitest";

describe("current page reducer", () => {
  const initialState: CurrentPageState = {
    value: "home",
  };

  it("should handle initial state", () => {
    expect(currentPageReducer(undefined, { type: "unknown" })).toEqual({
      value: "home",
    });
  });

  it("should handle update state", () => {
    const actual = currentPageReducer(
      initialState,
      setCurrentPage("monitoring")
    );
    expect(actual.value).toEqual("monitoring");
  });
});
