"use client";

import { Icon } from "@iconify/react";

import { GlitchText } from "@/components/primitives/GlitchText";
import { Reveal } from "@/components/primitives/Reveal";
import { SectionTitle } from "@/components/primitives/SectionTitle";
import { skillGroups } from "@/data/skills";

export function SkillsSection() {
  return (
    <div>
      <SectionTitle>WHAT I DO.</SectionTitle>
      <p className="max-w-2xl font-mono text-sm uppercase leading-relaxed tracking-widest text-terminal-soft">
        AI &amp; ML researcher working on generative AI, LLM-integrated digital
        twins, computer vision, and intelligent built environments.
      </p>
      <div className="my-12 border-t border-terminal-border" />
      <div className="grid gap-5 md:grid-cols-3">
        {skillGroups.map((group, index) => (
          <Reveal key={group.title} delay={index * 100}>
            <article className="flex min-h-[430px] flex-col rounded-lg border border-terminal-border bg-terminal-surface p-6 transition-colors duration-300 hover:border-terminal-signal">
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
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
