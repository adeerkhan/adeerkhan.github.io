import { ExternalLink } from "lucide-react";
import { SectionTitle } from "@/components/primitives/SectionTitle";
import { publications } from "@/data/publications";

// ponytail: static data file instead of a citation lib (citation-js etc.) —
// 4 fixed entries, a lib only earns its keep once papers become dynamic/BibTeX-imported.
export function PublicationsSection() {
  return (
    <div>
      <SectionTitle>PUBLICATIONS.</SectionTitle>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {publications.map((pub) => {
          const href = pub.doi ? `https://doi.org/${pub.doi}` : undefined;
          return (
            <article
              key={pub.title}
              className="flex flex-col border border-terminal-border bg-terminal-surface p-4 transition-colors duration-300 hover:border-terminal-signal"
            >
              <span className="font-mono text-xs text-terminal-signal">
                [{pub.year}]
              </span>
              <p className="mt-2 flex-1 font-mono text-xs leading-relaxed text-terminal-text">
                {pub.title}
              </p>
              <div className="mt-3 border-t border-terminal-border pt-2">
                <p className="text-xs text-terminal-dim">{pub.venue}</p>
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-1 border border-terminal-border px-2 py-1 font-mono text-[10px] text-terminal-dim transition-colors hover:border-terminal-signal hover:text-terminal-signal"
                  >
                    DOI <ExternalLink size={10} aria-hidden />
                  </a>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
