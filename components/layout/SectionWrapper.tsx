import { Reveal } from "@/components/primitives/Reveal";
import { cn } from "@/lib/utils";

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
  return (
    <section
      id={id}
      className={cn(
        "relative border-t border-terminal-border px-6 py-16 md:px-12 md:py-24",
        className,
      )}
    >
      <Reveal>{children}</Reveal>
    </section>
  );
}
