import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";

import nextConfig from "../next.config";
import { education } from "../data/education";
import { experience } from "../data/experience";
import { hero } from "../data/hero";
import { projects } from "../data/projects";
import { skillGroups } from "../data/skills";
import { socialLinks } from "../data/social";

describe("Plan.md portfolio requirements", () => {
  it("uses static export settings required by Next.js deployment", () => {
    expect(nextConfig.output).toBe("export");
    expect(nextConfig.trailingSlash).toBe(true);
    expect(nextConfig.images?.unoptimized).toBe(true);
  });

  it("centralizes all portfolio content in data files", () => {
    expect(hero.name).toBe("ADEER KHAN");
    expect(hero.stats).toEqual([
      { value: 4, suffix: "+", label: "Publications" },
      { value: 12, suffix: "+", label: "Projects" },
      { value: 2, suffix: "", label: "National Awards" },
    ]);
    expect(socialLinks.github).toBe("https://github.com/adeerkhan");
    expect(socialLinks.email).toBe("mailto:adeersafi@gmail.com");
    expect(skillGroups.map((group) => group.title)).toEqual([
      "Development & AI Integration",
      "Urban Intelligence",
      "Rapid Prototyping",
    ]);
    expect(
      skillGroups.flatMap((group) =>
        group.softwareSkills.map((skill) => skill.skillName),
      ),
    ).toEqual(
      expect.arrayContaining([
        "Python",
        "PyTorch",
        "Hugging Face",
        "LangChain",
        "Unity",
        "QGIS",
        "LaTeX",
      ]),
    );
    expect(education[0]).toMatchObject({
      schoolName: expect.any(String),
      subHeader: expect.any(String),
      duration: expect.any(String),
    });
    expect(experience.length).toBeGreaterThanOrEqual(4);
    expect(projects.length).toBeGreaterThanOrEqual(8);
  });

  it("keeps visual defaults brutalist and unrounded", async () => {
    const css = await import("node:fs/promises").then((fs) =>
      fs.readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    );

    expect(css).toContain("--terminal-signal: #FF3D00");
    expect(css).toContain("--terminal-grid");
    expect(css).toContain(".glitch:hover::before");
  });

  it("renders three What I Do cards", async () => {
    const source = await import("node:fs/promises").then((fs) =>
      fs.readFile(
        new URL("../components/sections/SkillsSection.tsx", import.meta.url),
        "utf8",
      ),
    );

    expect(source).toContain("grid gap-5 md:grid-cols-3");
  });

  it("stretches project cards to consistent row heights", async () => {
    const [sectionSource, cardSource] = await Promise.all([
      import("node:fs/promises").then((fs) =>
        fs.readFile(
          new URL("../components/sections/ProjectsSection.tsx", import.meta.url),
          "utf8",
        ),
      ),
      import("node:fs/promises").then((fs) =>
        fs.readFile(
          new URL("../components/cards/ProjectCard.tsx", import.meta.url),
          "utf8",
        ),
      ),
    ]);

    expect(sectionSource).toContain('className="h-full"');
    expect(cardSource).toContain('className="flex h-full flex-col"');
  });

  it("centers contact content with no photo", async () => {
    const source = await import("node:fs/promises").then((fs) =>
      fs.readFile(
        new URL("../components/sections/ContactSection.tsx", import.meta.url),
        "utf8",
      ),
    );

    expect(source).toContain("items-center");
    expect(source).toContain("text-center");
    expect(source).not.toContain("aspect-square");
    expect(source).not.toContain("avatar");
  });

  it("centers mobile hero text vertically without changing desktop alignment", async () => {
    const source = await import("node:fs/promises").then((fs) =>
      fs.readFile(
        new URL("../components/sections/HeroSection.tsx", import.meta.url),
        "utf8",
      ),
    );

    expect(source).toContain("justify-start");
    expect(source).toContain("my-auto");
    expect(source).toContain("pt-20");
    expect(source).toContain("md:min-h-screen");
    expect(source).toContain("md:justify-end");
    expect(source).toContain("md:my-0");
    expect(source).toContain("md:pt-24");
  });

  it("keeps software skill badges focused and readable", () => {
    const badgeNames = skillGroups.flatMap((group) =>
      group.softwareSkills.map((skill) => skill.skillName),
    );
    const capabilityText = skillGroups
      .flatMap((group) => group.capabilities)
      .join(" ");

    expect(
      skillGroups.every((group) => group.softwareSkills.length <= 11),
    ).toBe(true);
    expect(badgeNames).not.toEqual(
      expect.arrayContaining([
        "Django",
        "FastAPI",
        "Node.js",
        "Airflow",
        "Apache Spark",
        "ClickHouse",
        "BigQuery",
      ]),
    );
    expect(capabilityText).toContain("generative");
    expect(capabilityText).toContain("digital twin");
    expect(capabilityText).toContain("LLM");
  });

  it("never references a missing experience logo", () => {
    for (const item of experience) {
      if (item.companyLogo) {
        expect(
          existsSync(
            new URL(`../public${item.companyLogo}`, import.meta.url),
          ),
        ).toBe(true);
      }
    }
  });
});
