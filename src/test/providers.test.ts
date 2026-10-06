import { describe, expect, it } from "vitest";

import { canAccess } from "@/config/plans";
import { getForecast, getOfficeholders } from "@/data/providers";

describe("Baby Perfect providers", () => {
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

  it("keeps every deterministic forecast playfully bad", () => {
    for (const [name, area] of [["Mabel", "Austin"], ["George", "10001"], ["Juniper", "Seattle"]]) {
      const forecast = getForecast(name, area);
      expect(forecast.score).toBeGreaterThanOrEqual(4);
      expect(forecast.score).toBeLessThanOrEqual(38);
      expect(["D+", "D", "D-", "F"]).toContain(forecast.grade);
      expect(["Sell", "Strong Sell", "Junk Bond"]).toContain(forecast.rating);
      expect(forecast.career.industries.every(({ score }) => score >= 3 && score <= 35)).toBe(true);
      expect(forecast.career.cSuiteCount).toBeGreaterThanOrEqual(0);
      expect(forecast.career.cSuiteCount).toBeLessThanOrEqual(3);
      expect(forecast.school.academicScore).toBeGreaterThanOrEqual(8);
      expect(forecast.school.academicScore).toBeLessThanOrEqual(40);
      expect(forecast.school.collisions).toBeGreaterThanOrEqual(3);
      expect(forecast.school.collisions).toBeLessThanOrEqual(9);
      expect(forecast.lifespan.years).toBeGreaterThanOrEqual(58);
      expect(forecast.lifespan.years).toBeLessThanOrEqual(71);
      expect(forecast.happiness.score).toBeGreaterThanOrEqual(5);
      expect(forecast.happiness.score).toBeLessThanOrEqual(35);
      expect(forecast.love.probability).toBeGreaterThanOrEqual(2);
      expect(forecast.love.probability).toBeLessThanOrEqual(24);
    }
  });
});