"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  num: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionWrapper({
  id,
  num,
  children,
  className = "",
}: SectionWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        "relative border-t border-terminal-border px-6 py-16 md:px-12 md:py-24",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-3 select-none font-mono text-[48px] font-bold leading-none text-terminal-border md:right-8 md:top-2 md:text-[80px]"
      >
        {num}
      </span>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}
