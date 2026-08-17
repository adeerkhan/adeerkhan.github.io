"use client";

import Image from "next/image";
import { SectionTitle } from "@/components/primitives/SectionTitle";
import { certifications } from "@/data/certifications";

export function CertificationsSection() {
  return (
    <div>
      <SectionTitle>CERTIFICATIONS.</SectionTitle>
      <div className="grid gap-3 md:grid-cols-2">
        {certifications.map((cert) => (
          <article
            key={cert.name}
            className="flex items-center gap-4 border border-terminal-border bg-terminal-surface px-4 py-3 transition-colors duration-300 hover:border-terminal-signal"
          >
            <div className="relative h-7 w-7 shrink-0 border border-terminal-border bg-white p-0.5">
              <Image
                src={cert.logo}
                alt={`${cert.issuer} logo`}
                fill
                className="object-contain"
                sizes="28px"
              />
            </div>
            <div className="min-w-0">
              <a
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                className="block truncate font-mono text-sm font-bold text-terminal-text transition-colors duration-200 hover:text-red-500 hover:drop-shadow-[0_0_6px_rgba(239,68,68,0.6)]"
              >
                {cert.name}
              </a>
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
