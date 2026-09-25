import { describe, it, expect } from "vitest";
import { en } from "./site.en";
import { es } from "./site.es";
import type { SiteContent } from "./types";

function assertContentShape(site: SiteContent) {
  expect(site.profile.name).not.toBe("");
  expect(site.profile.email).toContain("@");
  expect(site.profile.linkedin).toContain("linkedin.com");
  expect(site.about.length).toBeGreaterThan(0);
  expect(site.projects.length).toBe(4);
  for (const project of site.projects) {
    expect(project.company).not.toBe("");
    expect(project.stack.length).toBeGreaterThan(0);
    expect(project.achievements.length).toBeGreaterThan(0);
  }
  expect(site.experience.length).toBe(8);
  expect(site.skills.length).toBe(3);
  expect(site.education.certifications.length).toBe(4);
}

describe("site content", () => {
  it("English content has the expected shape", () => {
    assertContentShape(en);
  });

  it("Spanish content has the expected shape", () => {
    assertContentShape(es);
  });

  it("English and Spanish have matching entry counts", () => {
    expect(en.projects.length).toBe(es.projects.length);
    expect(en.experience.length).toBe(es.experience.length);
    expect(en.skills.length).toBe(es.skills.length);
  });
});
