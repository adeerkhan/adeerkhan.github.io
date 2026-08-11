"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

import { GlitchText } from "@/components/primitives/GlitchText";
import { SectionTitle } from "@/components/primitives/SectionTitle";
import { SkillBadge } from "@/components/primitives/SkillBadge";
import { useInViewOnce } from "@/hooks/use-in-view-once";
import { skillGroups } from "@/data/skills";

export function SkillsSection() {
  const { ref, isInView } = useInViewOnce();

  return (
    <div ref={ref}>
      <SectionTitle>WHAT I DO.</SectionTitle>
      <p className="max-w-2xl font-mono text-sm uppercase leading-relaxed tracking-widest text-terminal-soft">
        AI &amp; ML researcher working on generative AI, LLM-integrated digital
        twins, computer vision, and intelligent built environments.
      </p>
      <div className="my-12 border-t border-terminal-border" />
      <div className="grid gap-5 md:grid-cols-3">
        {skillGroups.map((group) => (
          <motion.article
            key={group.title}
            className="flex min-h-[430px] flex-col rounded-lg border border-terminal-border bg-terminal-surface p-6 transition-colors duration-300 hover:border-terminal-signal"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start gap-4">
              <Icon
                icon={group.iconifyTag}
                width={34}
                height={34}
                aria-hidden
                style={{ color: group.accent }}
              />
              <h3 className="font-mono text-xl font-bold uppercase leading-tight text-terminal-text">
                <GlitchText>{group.title}</GlitchText>
              </h3>
            </div>

            <h4 className="mt-12 max-w-sm font-mono text-3xl font-bold leading-tight text-terminal-text">
              {group.headline}
            </h4>
            <p className="mt-8 text-base leading-relaxed text-terminal-soft">
              {group.summary}
            </p>

            <div className="mt-auto flex flex-wrap gap-2 pt-8">
              {group.softwareSkills.map((skill) => (
                <SkillBadge key={skill.skillName} {...skill} />
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
