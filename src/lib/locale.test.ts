import { describe, it, expect, afterEach, vi } from "vitest";
import { getAlternateLocalePath } from "./locale";

describe("getAlternateLocalePath", () => {
  describe("without a base path (BASE_URL = \"/\")", () => {
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

  describe("with a configured base path (BASE_URL = \"/portfolio/\")", () => {
    afterEach(() => {
      vi.unstubAllEnvs();
    });

    it("switches from the base-prefixed English root to the Spanish root", () => {
      vi.stubEnv("BASE_URL", "/portfolio/");
      expect(getAlternateLocalePath("/portfolio/")).toBe("/portfolio/es/");
    });

    it("switches from the base-prefixed Spanish root to the English root", () => {
      vi.stubEnv("BASE_URL", "/portfolio/");
      expect(getAlternateLocalePath("/portfolio/es/")).toBe("/portfolio/");
    });

    it("treats a base-prefixed /es without a trailing slash as Spanish", () => {
      vi.stubEnv("BASE_URL", "/portfolio/");
      expect(getAlternateLocalePath("/portfolio/es")).toBe("/portfolio/");
    });

    it("normalizes a BASE_URL without a trailing slash (Astro reflects the raw base config as-is)", () => {
      vi.stubEnv("BASE_URL", "/portfolio");
      expect(getAlternateLocalePath("/portfolio")).toBe("/portfolio/es/");
      expect(getAlternateLocalePath("/portfolio/es/")).toBe("/portfolio/");
    });
  });
});
