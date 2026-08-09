import { cn } from "@/lib/utils";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <h2
      className={cn(
        "mb-12 font-mono text-[clamp(40px,7vw,96px)] font-bold leading-[0.9] text-terminal-text",
        className,
      )}
    >
      {children}
    </h2>
  );
}
