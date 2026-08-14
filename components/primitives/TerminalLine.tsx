"use client";

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
    <span className={cn(cursor && "cursor", className)}>
      {text.split("").map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="terminal-char"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
