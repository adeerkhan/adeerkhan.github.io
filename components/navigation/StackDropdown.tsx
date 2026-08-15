"use client";

import { Icon } from "@iconify/react";

import { stackGroups, type StackSkill } from "@/data/stack";

function StackChip({ skill }: { skill: StackSkill }) {
  return (
    <span className="inline-flex items-center gap-2 border border-terminal-border bg-terminal-elevated px-2.5 py-1 font-body text-xs text-terminal-soft transition-colors duration-200 hover:border-terminal-signal hover:text-terminal-signal">
      {skill.iconifyTag ? (
        <Icon icon={skill.iconifyTag} width={16} height={16} aria-hidden />
      ) : null}
      {skill.name}
    </span>
  );
}

export function StackDropdown() {
  return (
    <div className="group relative">
      <button
        type="button"
        aria-haspopup="true"
        className="font-mono text-xs uppercase tracking-widest text-terminal-dim transition-all duration-200 hover:text-terminal-text hover:[text-shadow:0_0_8px_var(--terminal-signal),0_0_20px_var(--terminal-signal)]"
      >
        Stack
      </button>
      <div className="invisible absolute right-0 top-full z-50 w-[640px] max-w-[90vw] translate-y-1 border border-terminal-border bg-terminal-surface/95 opacity-0 shadow-2xl backdrop-blur transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        <div className="border-b border-terminal-border px-6 py-4 font-mono text-xs uppercase tracking-widest text-terminal-dim">
          <span className="text-terminal-signal">&gt;</span> Tech Stack
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-6 px-6 py-6">
          {stackGroups.map((group) => (
            <div key={group.title}>
              <h4
                className="mb-3 font-mono text-[11px] font-bold uppercase tracking-widest"
                style={{ color: group.accent }}
              >
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
    </div>
  );
}
