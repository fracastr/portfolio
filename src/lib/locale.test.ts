import { describe, it, expect } from "vitest";
import { getAlternateLocalePath } from "./locale";

describe("getAlternateLocalePath", () => {
  it("switches from the English root to the Spanish root", () => {
    expect(getAlternateLocalePath("/")).toBe("/es/");
  });

  it("switches from the Spanish root to the English root", () => {
    expect(getAlternateLocalePath("/es/")).toBe("/");
  });

  it("treats /es without a trailing slash as Spanish", () => {
    expect(getAlternateLocalePath("/es")).toBe("/");
  });
});
