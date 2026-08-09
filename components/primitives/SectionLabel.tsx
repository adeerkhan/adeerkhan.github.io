interface SectionLabelProps {
  num: string;
}

export function SectionLabel({ num }: SectionLabelProps) {
  return (
    <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-terminal-signal">
      <span className="text-terminal-dim">{"//"}</span>
      <span>SECTION_{num}</span>
    </p>
  );
}
