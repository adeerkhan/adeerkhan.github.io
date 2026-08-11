"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { useInViewOnce } from "@/hooks/use-in-view-once";

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionWrapper({
  id,
  children,
  className = "",
}: SectionWrapperProps) {
  const { ref, isInView } = useInViewOnce<HTMLElement>("-60px");

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        "relative border-t border-terminal-border px-6 py-16 md:px-12 md:py-24",
        className,
      )}
    >
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
