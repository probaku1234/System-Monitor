import currentPageReducer from "./currentPageSlice";

describe("current page reducer", () => {
  it("should work", () => {
    expect(currentPageReducer(undefined, { type: "unkown" })).toEqual({
      value: 0,
    });
  });
});
