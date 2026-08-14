import { ProjectCard } from "@/components/cards/ProjectCard";
import { Reveal } from "@/components/primitives/Reveal";
import { SectionTitle } from "@/components/primitives/SectionTitle";
import { projects } from "@/data/projects";

export function ProjectsSection() {
  return (
    <div>
      <SectionTitle>PROJECTS.</SectionTitle>
      <div className="grid gap-4 md:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.name} delay={index * 60} className="h-full">
            <ProjectCard {...project} index={index} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
