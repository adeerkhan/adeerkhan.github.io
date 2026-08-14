import { PageShell } from "@/components/layout/PageShell";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { NavBar } from "@/components/navigation/NavBar";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { PublicationsSection } from "@/components/sections/PublicationsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";

export default function Home() {
  return (
    <PageShell>
      <NavBar />
      <HeroSection />
      <SectionWrapper id="skills">
        <SkillsSection />
      </SectionWrapper>
      <SectionWrapper id="experience">
        <ExperienceSection />
      </SectionWrapper>
      <SectionWrapper id="education">
        <EducationSection />
      </SectionWrapper>
      <SectionWrapper id="projects">
        <ProjectsSection />
      </SectionWrapper>
      <SectionWrapper id="publications">
        <PublicationsSection />
      </SectionWrapper>
      <SectionWrapper id="awards">
        <AwardsSection />
      </SectionWrapper>
      <SectionWrapper id="contact" className="pb-6 md:pb-12">
        <ContactSection />
      </SectionWrapper>
    </PageShell>
  );
}
