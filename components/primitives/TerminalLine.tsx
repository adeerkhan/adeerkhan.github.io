"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface TerminalLineProps {
  text: string;
  className?: string;
  cursor?: boolean;
}

export function TerminalLine({
  text,
  className,
  cursor = false,
}: TerminalLineProps) {
  return (
    <motion.span
      className={cn(cursor && "cursor", className)}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
