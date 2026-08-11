"use client";

import { motion } from "framer-motion";

import { ProjectCard } from "@/components/cards/ProjectCard";
import { SectionTitle } from "@/components/primitives/SectionTitle";
import { useInViewOnce } from "@/hooks/use-in-view-once";
import { projects } from "@/data/projects";

export function ProjectsSection() {
  const { ref, isInView } = useInViewOnce();

  return (
    <div ref={ref}>
      <SectionTitle>PROJECTS.</SectionTitle>
      <motion.div
        className="grid gap-4 md:grid-cols-3"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1 } },
        }}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.name}
            className="h-full"
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            <ProjectCard {...project} index={index} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
