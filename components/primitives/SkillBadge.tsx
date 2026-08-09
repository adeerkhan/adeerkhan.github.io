"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SkillBadgeProps {
  skillName: string;
  iconifyTag: string;
}

export function SkillBadge({ skillName, iconifyTag }: SkillBadgeProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.span
          variants={{
            hidden: { opacity: 0, y: 16 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          className="inline-flex items-center gap-2 border border-terminal-border px-3 py-1 font-body text-xs text-terminal-soft transition-colors duration-200 hover:border-terminal-signal hover:text-terminal-signal"
        >
          <Icon icon={iconifyTag} width={16} height={16} aria-hidden />
          {skillName}
        </motion.span>
      </TooltipTrigger>
      <TooltipContent>{skillName}</TooltipContent>
    </Tooltip>
  );
}
