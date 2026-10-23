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
  expect(site.builds.length).toBe(7);
  for (const build of site.builds) {
    expect(build.name).not.toBe("");
    expect(build.stack.length).toBeGreaterThan(0);
    expect(build.imageAlt).not.toBe("");
  }
  expect(site.workNotes.length).toBe(4);
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
    expect(en.education.certifications.length).toBe(es.education.certifications.length);
    expect(en.projects.map((p) => p.id)).toEqual(es.projects.map((p) => p.id));
    expect(en.builds.map((b) => [b.id, b.image, b.url, b.stack])).toEqual(
      es.builds.map((b) => [b.id, b.image, b.url, b.stack]),
    );
  });
});
