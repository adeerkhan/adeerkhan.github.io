"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/primitives/ThemeToggle";
import { socialLinks } from "@/data/social";

const navLinks = [
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
          className="font-mono text-lg font-bold tracking-wider text-terminal-text"
        >
          <span className="text-terminal-signal">&gt;</span> ADEER_KHAN
        </a>
        <div className="hidden items-center gap-3 md:flex">
          {navLinks.map(({ href, label, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center border border-terminal-border text-terminal-dim transition-colors duration-200 hover:border-terminal-signal hover:text-terminal-signal"
            >
              <Icon icon={icon} width={18} height={18} aria-hidden />
            </a>
          ))}
          <Button asChild>
            <a href={socialLinks.email}>[ CONTACT ]</a>
          </Button>
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-3 md:hidden">
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
        <div className="border-b border-terminal-border bg-terminal-surface md:hidden">
          {[
            ...navLinks,
            { href: socialLinks.email, label: "CONTACT", icon: "mdi:email-outline" },
          ].map(
            ({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                className="flex items-center justify-between border-b border-terminal-border px-6 py-4 font-mono text-xs text-terminal-dim"
                onClick={() => setOpen(false)}
              >
                <span>{label}</span>
                <Icon icon={icon} width={16} height={16} aria-hidden />
              </a>
            ),
          )}
        </div>
      ) : null}
    </header>
  );
}
