import sendResponse from "./index";
import { EITHER } from "../operator";

describe("sendResponse Function", () => {
  const res = { status: undefined, json: () => {} };

  it("should return either object", () => {
    expect(sendResponse(res).type).toBe(EITHER);
  });

  it("should have function in left side", () => {
    expect(sendResponse(res).left).toBeInstanceOf(Function);
  });

  it("should have function in right side", () => {
    expect(sendResponse(res).right).toBeInstanceOf(Function);
  });
});
