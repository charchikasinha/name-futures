import { describe, expect, it } from "vitest";

import { canAccess } from "@/config/plans";
import { getForecast, getOfficeholders } from "@/data/providers";

describe("Name Futures providers", () => {
  it("returns stable results for the same normalized inputs", () => {
    expect(getForecast("Mabel", "10001")).toEqual(getForecast("mabel", "10001"));
  });

  it("matches real president first names", () => {
    expect(getOfficeholders("George", "Austin").presidents).toContain("George Washington");
  });

  it("keeps plan access centralized", () => {
    expect(canAccess("free", "school")).toBe(true);
    expect(canAccess("free", "love")).toBe(false);
    expect(canAccess("premium", "compare")).toBe(true);
  });
});