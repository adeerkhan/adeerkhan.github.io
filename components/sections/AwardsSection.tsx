import { SectionTitle } from "@/components/primitives/SectionTitle";
import { awards } from "@/data/awards";

export function AwardsSection() {
  return (
    <div>
      <SectionTitle>AWARDS.</SectionTitle>
      <div className="grid gap-4 md:grid-cols-2">
        {awards.map((award, index) => (
          <article
            key={award.title}
            className="flex h-full flex-col border border-terminal-border bg-terminal-surface p-4 transition-colors duration-300 hover:border-terminal-signal"
          >
            <span className="font-mono text-xs text-terminal-signal">
              [{String(index + 1).padStart(2, "0")}]
            </span>
            <h3 className="mt-2 font-mono text-sm font-bold text-terminal-text">
              {award.title}
            </h3>
            <p className="mt-1 text-xs text-terminal-dim">{award.institution}</p>
            <p className="mt-2 flex-1 text-xs leading-relaxed text-terminal-soft">
              {award.desc}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
