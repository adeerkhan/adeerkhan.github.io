import { PageShell } from "@/components/layout/PageShell";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { NavBar } from "@/components/navigation/NavBar";
import { ContactSection, type GithubProfile } from "@/components/sections/ContactSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { PublicationsSection } from "@/components/sections/PublicationsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";

const fallbackGithub: GithubProfile = {
  avatar_url: "https://github.com/adeerkhan.png",
  bio: "AI & Machine Learning Researcher",
  location: null,
  html_url: "https://github.com/adeerkhan",
  login: "adeerkhan",
};

async function getGithubProfile(): Promise<GithubProfile> {
  try {
    const res = await fetch("https://api.github.com/users/adeerkhan", {
      headers: { Accept: "application/vnd.github.v3+json" },
      cache: "force-cache",
    });

    if (!res.ok) return fallbackGithub;

    const data = (await res.json()) as Partial<GithubProfile>;
    return {
      avatar_url: data.avatar_url || fallbackGithub.avatar_url,
      bio: data.bio ?? fallbackGithub.bio,
      location: data.location ?? fallbackGithub.location,
      html_url: data.html_url || fallbackGithub.html_url,
      login: data.login || fallbackGithub.login,
    };
  } catch {
    return fallbackGithub;
  }
}

export default async function Home() {
  const github = await getGithubProfile();

  return (
    <PageShell>
      <NavBar />
      <HeroSection />
      <SectionWrapper id="skills" num="02">
        <SkillsSection />
      </SectionWrapper>
      <SectionWrapper id="experience" num="03">
        <ExperienceSection />
      </SectionWrapper>
      <SectionWrapper id="education" num="04">
        <EducationSection />
      </SectionWrapper>
      <SectionWrapper id="projects" num="05">
        <ProjectsSection />
      </SectionWrapper>
      <SectionWrapper id="publications" num="06">
        <PublicationsSection />
      </SectionWrapper>
      <SectionWrapper id="contact" num="07">
        <ContactSection github={github} />
      </SectionWrapper>
    </PageShell>
  );
}
