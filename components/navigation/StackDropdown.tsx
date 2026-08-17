"use client";

import { Icon } from "@iconify/react";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { stackGroups, type StackSkill } from "@/data/stack";

const PANEL_WIDTH = 640;

function StackChip({ skill }: { skill: StackSkill }) {
  return (
    <span className="inline-flex items-center gap-2 border border-terminal-border bg-terminal-elevated px-2.5 py-1 font-body text-xs text-terminal-soft transition-colors duration-200 hover:border-terminal-signal hover:text-terminal-signal">
      {skill.iconifyTag ? (
        <Icon icon={skill.iconifyTag} width={16} height={16} aria-hidden className="text-terminal-dim transition-colors duration-200 group-hover:text-terminal-signal" />
      ) : null}
      {skill.name}
    </span>
  );
}

export function StackDropdown() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | null>(null);
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [pos, setPos] = useState<{
    top?: number;
    bottom?: number;
    left: number;
    maxHeight: string;
  } | null>(null);

  const open = hovered || pinned;

  const clearCloseTimer = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const updatePos = () => {
    const el = buttonRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const left = Math.max(
      8,
      Math.min(rect.left, window.innerWidth - PANEL_WIDTH - 8),
    );
    const spaceAbove = rect.top - 8;
    const spaceBelow = window.innerHeight - rect.bottom - 8;
    if (spaceAbove >= 300 || spaceAbove > spaceBelow) {
      setPos({
        bottom: window.innerHeight - rect.top + 8,
        left,
        maxHeight: `${Math.max(100, spaceAbove)}px`,
      });
    } else {
      setPos({
        top: rect.bottom + 8,
        left,
        maxHeight: `${Math.max(100, spaceBelow)}px`,
      });
    }
  };

  const show = () => {
    clearCloseTimer();
    updatePos();
    setHovered(true);
  };
  const scheduleHide = () => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setHovered(false), 150);
  };

  const togglePin = () => {
    if (!pinned) {
      clearCloseTimer();
      updatePos();
      setPinned(true);
    } else {
      setPinned(false);
    }
  };

  useEffect(() => {
    if (!pinned) return;
    const onDown = (event: MouseEvent) => {
      if (buttonRef.current?.contains(event.target as Node)) return;
      const panel = document.getElementById("stack-panel");
      if (panel?.contains(event.target as Node)) return;
      setPinned(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPinned(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
      clearCloseTimer();
    };
  }, [pinned]);

  const panel = open && pos ? (
    <div
      id="stack-panel"
      className="fixed z-[70] overflow-y-auto border border-terminal-border bg-terminal-surface shadow-2xl"
      style={{
        top: pos.top,
        bottom: pos.bottom,
        left: pos.left,
        width: PANEL_WIDTH,
        maxWidth: "calc(100vw - 16px)",
        maxHeight: pos.maxHeight,
      }}
      onMouseEnter={show}
      onMouseLeave={scheduleHide}
    >
      <div className="border-b border-terminal-border px-6 py-4 font-mono text-xs uppercase tracking-widest text-terminal-dim">
        {"//"} Tech Stack
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 px-6 py-6">
        {stackGroups.map((group) => (
          <div key={group.title}>
            <h4 className="mb-3 font-mono text-[11px] font-bold uppercase tracking-widest text-terminal-text">
              {group.title}
            </h4>
            {group.note ? (
              <p className="mb-3 text-[11px] italic text-terminal-dim">
                {group.note}
              </p>
            ) : null}
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <StackChip key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : null;

  return (
    <div
      className="relative"
      onMouseEnter={show}
      onMouseLeave={scheduleHide}
    >
      <Button
        ref={buttonRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={togglePin}
      >
        <Icon icon="ph:stack" width={16} height={16} aria-hidden />
        Stack
      </Button>
      {typeof document !== "undefined" ? createPortal(panel, document.body) : null}
    </div>
  );
}
