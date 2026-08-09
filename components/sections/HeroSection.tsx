"use client";

import { Button } from "@/components/ui/button";
import { ParticlesBackground } from "@/components/primitives/ParticlesBackground";
import { SocialLink } from "@/components/primitives/SocialLink";
import { TerminalLine } from "@/components/primitives/TerminalLine";
import { hero } from "@/data/hero";
import { socialLinks } from "@/data/social";
import { useCountUp } from "@/hooks/use-count-up";
import { SectionLabel } from "../primitives/SectionLabel";

function StatItem({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const { ref, count } = useCountUp(value);

  return (
    <div
      ref={ref}
      className="border-r border-terminal-border px-4 py-6 last:border-r-0 md:px-8"
    >
      <div className="font-mono text-4xl font-bold text-terminal-text">
        {count}
        <span className="text-terminal-signal">{suffix}</span>
      </div>
      <p className="mt-2 text-xs uppercase tracking-widest text-terminal-dim">
        {label}
      </p>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-start overflow-hidden px-6 pb-0 pt-20 md:min-h-screen md:justify-end md:px-12 md:pt-24"
    >
      <ParticlesBackground />
      <div className="relative z-10 my-auto max-w-5xl pb-12 md:my-0 md:pb-16">
        <SectionLabel num="01" />
        <h1 className="font-mono text-[clamp(64px,12vw,160px)] font-bold leading-none text-terminal-text">
          <span className="block">{hero.greeting}</span>
          <span className="block">
            {"I'M "}
            <TerminalLine text={hero.name} cursor />
          </span>
        </h1>
        <p className="mt-8 max-w-xl whitespace-pre-line border-l-2 border-terminal-signal pl-4 text-sm leading-relaxed text-terminal-soft">
          {hero.description}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button asChild>
            <a href={hero.resumeLink}>[ SEE MY RESUME ]</a>
          </Button>
          <SocialLink href={socialLinks.github} icon="mdi:github" label="GitHub" />
          <SocialLink
            href={socialLinks.linkedin}
            icon="mdi:linkedin"
            label="LinkedIn"
          />
          <SocialLink
            href={socialLinks.instagram}
            icon="mdi:instagram"
            label="Instagram"
          />
        </div>
      </div>
      <div className="relative z-10 grid grid-cols-3 border-t border-terminal-border">
        {hero.stats.map((stat) => (
          <StatItem key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}
