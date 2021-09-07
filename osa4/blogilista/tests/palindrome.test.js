import { palindrome, average } from "../utils/for_testing.js";

test("palindrome of a", () => {
  const result = palindrome("a");
  expect(result).toBe("a");
});

test("palindrome of react", () => {
  const result = palindrome("react");
  expect(result).toBe("tcaer");
});

test("palindrome of saippuakauppias", () => {
  const result = palindrome("saippuakauppias");
  expect(result).toBe("saippuakauppias");
});

describe("average", () => {
  test("of one value is the value itself", () => {
    expect(average([1])).toBe(1);
  });

  test("of many is calculated right", () => {
    expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5);
  });

  test("of empty array is zero", () => {
    expect(average([])).toBe(0);
  });
});
