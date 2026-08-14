"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface ProjectVideoProps {
  src: string;
  name: string;
}

export function ProjectVideo({ src, name }: ProjectVideoProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Zoom ${name}`}
        className="h-full w-full cursor-zoom-in"
      >
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
          aria-hidden
        />
      </button>
      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${name} video`}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/90 p-4 md:p-10"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center border border-terminal-border bg-terminal-bg text-terminal-text transition-colors hover:border-terminal-signal hover:text-terminal-signal"
          >
            <X size={18} aria-hidden />
          </button>
          <video
            src={src}
            autoPlay
            muted
            loop
            playsInline
            controls
            onClick={(event) => event.stopPropagation()}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      ) : null}
    </>
  );
}
