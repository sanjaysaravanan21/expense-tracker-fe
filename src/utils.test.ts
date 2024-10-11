// Test Case For Unit Testing the util functions

import { convertDashedToCapitalized } from "./utils";

// test convertDashedToCapitalized
test("Capitalize Func", () => {
  expect(convertDashedToCapitalized("home")).toBe("Home");
});
