"use client";

import { motion } from "framer-motion";

import { SectionLabel } from "@/components/primitives/SectionLabel";
import { SectionTitle } from "@/components/primitives/SectionTitle";
import { SkillBadge } from "@/components/primitives/SkillBadge";
import { GlitchText } from "@/components/primitives/GlitchText";
import { useInViewOnce } from "@/hooks/use-in-view-once";
import { skillGroups } from "@/data/skills";

export function SkillsSection() {
  const { ref, isInView } = useInViewOnce();

  return (
    <div ref={ref}>
      <SectionLabel num="02" />
      <SectionTitle>WHAT I DO.</SectionTitle>
      <p className="max-w-2xl font-mono text-sm uppercase leading-relaxed tracking-widest text-terminal-soft">
        AI &amp; ML researcher working on generative AI, LLM-integrated digital
        twins, computer vision, and geospatial data science for the built
        environment
      </p>
      <div className="my-12 border-t border-terminal-border" />
      <div className="space-y-12 md:space-y-16">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
          >
            <div>
              <h3 className="mb-6 font-mono text-2xl font-bold uppercase text-terminal-text">
                <span className="text-terminal-signal">&gt; </span>
                <GlitchText>{group.title}</GlitchText>
              </h3>
              <ul className="space-y-3">
                {group.capabilities.map((capability) => (
                  <li
                    key={capability}
                    className="flex gap-3 text-sm font-medium text-terminal-soft"
                  >
                    <span className="text-terminal-signal">-</span>
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>
            </div>
              <motion.div
                className="flex flex-wrap content-start gap-2"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.04 } },
                }}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
              >
                {group.softwareSkills.map((skill) => (
                  <SkillBadge key={skill.skillName} {...skill} />
                ))}
              </motion.div>
            </div>
          ))}
        </div>
    </div>
  );
}
