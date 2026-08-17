"use client";

import { Button } from "@/components/ui/button";
import { GlitchText } from "@/components/primitives/GlitchText";
import { HeroProfile } from "@/components/primitives/HeroProfile";
import { StackDropdown } from "@/components/navigation/StackDropdown";
import { TerminalLine } from "@/components/primitives/TerminalLine";
import { TypewriterText } from "@/components/primitives/TypewriterText";
import { hero } from "@/data/hero";
import { useCountUp } from "@/hooks/use-count-up";

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
      <div className="relative z-10 my-auto max-w-5xl pb-8 md:my-0 md:pb-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <h1 className="font-mono text-[clamp(40px,9vw,140px)] font-bold leading-none text-terminal-text">
            <span className="block whitespace-nowrap">
              <GlitchText>{`${hero.greeting} I'M`}</GlitchText>
            </span>
            <span className="block whitespace-nowrap">
              <span className="glitch" data-text={hero.name}>
                <TerminalLine text={hero.name} cursor />
              </span>
            </span>
          </h1>
          <HeroProfile />
        </div>
        <p className="mt-8 max-w-xl whitespace-pre-line border-l-2 border-terminal-signal pl-4 text-sm leading-relaxed text-terminal-soft">
          <TypewriterText text={hero.description} />
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button asChild>
            <a href={hero.resumeLink} target="_blank" rel="noreferrer">[ SEE MY RESUME ]</a>
          </Button>
          <StackDropdown />
          <Button asChild>
            <a href="#projects">[ VIEW WORK ]</a>
          </Button>
          <Button asChild>
            <a href="#contact">[ GET IN TOUCH ]</a>
          </Button>
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
