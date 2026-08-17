"use client";

import { Icon } from "@iconify/react";
import { SectionTitle } from "@/components/primitives/SectionTitle";
import { certifications } from "@/data/certifications";

export function CertificationsSection() {
  return (
    <div>
      <SectionTitle>COURSES & CERTIFICATIONS.</SectionTitle>
      <div className="grid gap-3 md:grid-cols-2">
        {certifications.map((cert) => (
          <article
            key={cert.name}
            className="flex items-center gap-4 border border-terminal-border bg-terminal-surface px-4 py-3 transition-colors duration-300 hover:border-terminal-signal"
          >
            <Icon
              icon={cert.icon}
              width={28}
              height={28}
              aria-hidden
              className="shrink-0 text-terminal-dim"
            />
            <div className="min-w-0">
              <p className="truncate font-mono text-sm font-bold text-terminal-text">
                {cert.name}
              </p>
              <p className="truncate text-xs text-terminal-dim">
                {cert.issuer}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
