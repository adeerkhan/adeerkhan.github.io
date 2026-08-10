import { Icon as IconifyIcon } from "@iconify/react";

import { cn } from "@/lib/utils";

interface SocialLinkProps {
  href: string;
  icon: string;
  label: string;
  showLabel?: boolean;
  className?: string;
}

export function SocialLink({
  href,
  icon,
  label,
  showLabel = false,
  className,
}: SocialLinkProps) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") || href === "#" ? undefined : "_blank"}
      rel={href.startsWith("mailto:") || href === "#" ? undefined : "noreferrer"}
      aria-label={label}
      className={cn(
        showLabel
          ? "flex items-center gap-2 border border-terminal-border px-4 py-2 font-mono text-xs text-terminal-dim transition-colors duration-200 hover:border-terminal-signal hover:bg-terminal-signal hover:text-terminal-bg"
          : "flex h-9 w-9 items-center justify-center border border-terminal-border text-terminal-dim transition-colors duration-200 hover:border-terminal-signal hover:bg-terminal-signal hover:text-terminal-bg",
        className,
      )}
    >
      <IconifyIcon icon={icon} width={18} height={18} aria-hidden />
      {showLabel ? <span>{label}</span> : null}
    </a>
  );
}
