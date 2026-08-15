"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Menu, X } from "lucide-react";

import { GlitchText } from "@/components/primitives/GlitchText";
import { ThemeToggle } from "@/components/primitives/ThemeToggle";
import { StackDropdown } from "@/components/navigation/StackDropdown";
import { socialLinks } from "@/data/social";

const sectionLinks = [
  { href: "#skills", label: "SKILLS" },
  { href: "#experience", label: "EXPERIENCE" },
  { href: "#projects", label: "PROJECTS" },
  { href: "#awards", label: "AWARDS" },
  { href: "#contact", label: "CONTACT" },
];

const socialNavLinks = [
  { href: socialLinks.github, label: "GitHub", icon: "mdi:github" },
  { href: socialLinks.linkedin, label: "LinkedIn", icon: "mdi:linkedin" },
  { href: socialLinks.instagram, label: "Instagram", icon: "mdi:instagram" },
];

export function NavBar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let previousY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      setHidden(currentY > 80 && currentY > previousY);
      previousY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b border-terminal-border bg-terminal-bg/90 backdrop-blur-sm transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:px-12">
        <a
          href="#hero"
          className="font-mono text-lg font-bold tracking-wider text-terminal-text transition-all duration-200 hover:[text-shadow:0_0_10px_var(--terminal-signal),0_0_24px_var(--terminal-signal)]"
        >
          <span className="text-terminal-signal">&gt;</span>{" "}
          <GlitchText>ADEER_KHAN</GlitchText>
        </a>
        <div className="hidden items-center gap-5 lg:flex">
          <StackDropdown />
          {sectionLinks.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              className="font-mono text-xs uppercase tracking-widest text-terminal-dim transition-all duration-200 hover:text-terminal-text hover:[text-shadow:0_0_8px_var(--terminal-signal),0_0_20px_var(--terminal-signal)]"
            >
              {label}
            </a>
          ))}
          <div className="ml-2 flex items-center gap-3">
            {socialNavLinks.map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center border border-terminal-border text-terminal-dim transition-colors duration-200 hover:border-terminal-signal hover:bg-terminal-signal hover:text-terminal-bg"
              >
                <Icon icon={icon} width={18} height={18} aria-hidden />
              </a>
            ))}
            <ThemeToggle />
          </div>
        </div>
        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="flex h-9 w-9 items-center justify-center border border-terminal-border text-terminal-dim transition-colors hover:border-terminal-signal hover:text-terminal-signal"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      {open ? (
        <div className="border-b border-terminal-border bg-terminal-surface lg:hidden">
          {sectionLinks.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              className="block border-b border-terminal-border px-6 py-4 font-mono text-xs text-terminal-dim transition-colors duration-200 hover:bg-terminal-signal hover:text-terminal-bg"
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          {socialNavLinks.map(({ href, label, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between border-b border-terminal-border px-6 py-4 font-mono text-xs text-terminal-dim transition-colors duration-200 hover:bg-terminal-signal hover:text-terminal-bg"
              onClick={() => setOpen(false)}
            >
              <span>{label}</span>
              <Icon icon={icon} width={16} height={16} aria-hidden />
            </a>
          ))}
        </div>
      ) : null}
    </header>
  );
}
