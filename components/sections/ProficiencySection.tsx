"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

import { ProgressBar } from "@/components/primitives/ProgressBar";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { SectionTitle } from "@/components/primitives/SectionTitle";
import { proficiency } from "@/data/proficiency";

export function ProficiencySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="space-y-12">
      <div>
        <SectionLabel num="03" />
        <SectionTitle>PROFICIENCY.</SectionTitle>
        <p className="max-w-md text-sm leading-relaxed text-terminal-soft">
          Focused on machine learning, deep learning, generative AI, and
          spatial data science.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {proficiency.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex justify-between gap-4">
              <span className="font-mono text-sm uppercase text-terminal-text">
                {item.label}
              </span>
              <span className="font-mono text-sm text-terminal-signal">
                {item.percentage}%
              </span>
            </div>
            <ProgressBar value={item.percentage} active={isInView} />
          </div>
        ))}
      </div>
    </div>
  );
}
