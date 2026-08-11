import { Icon } from "@iconify/react";

interface SkillBadgeProps {
  skillName: string;
  iconifyTag: string;
}

export function SkillBadge({ skillName, iconifyTag }: SkillBadgeProps) {
  return (
    <span
      className="inline-flex items-center gap-2 border border-terminal-border px-3 py-1 font-body text-xs text-terminal-soft transition-colors duration-200 hover:border-terminal-signal hover:text-terminal-signal"
    >
      <Icon icon={iconifyTag} width={16} height={16} aria-hidden />
      {skillName}
    </span>
  );
}
