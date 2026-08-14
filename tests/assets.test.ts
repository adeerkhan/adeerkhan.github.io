import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";

import { education } from "../data/education";
import { experience } from "../data/experience";
import { projects } from "../data/projects";

const images = [
  ...education.map((item) => item.schoolLogo).filter(Boolean),
  ...experience.map((item) => item.companyLogo).filter(Boolean),
  ...projects.map((item) => item.image).filter(Boolean),
];

describe("referenced assets exist", () => {
  it("every image referenced in data files exists in public/", () => {
    expect(images.length).toBeGreaterThan(0);
    for (const src of images) {
      expect(
        existsSync(new URL(`../public${src}`, import.meta.url)),
        `missing asset: ${src}`,
      ).toBe(true);
    }
  });
});
