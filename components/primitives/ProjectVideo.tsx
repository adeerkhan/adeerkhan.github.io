"use client";

import { useEffect, useRef, useState } from "react";

import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ProjectVideoProps {
  src: string;
  name: string;
}

export function ProjectVideo({ src, name }: ProjectVideoProps) {
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const playVideo = () => videoRef.current?.play().catch(() => {});
  const pauseVideo = () => videoRef.current?.pause();

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialog?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !dialog) return;
      const focusables = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])',
      );
      const items = Array.from(focusables).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        onMouseEnter={playVideo}
        onMouseLeave={pauseVideo}
        aria-label={`Zoom ${name}`}
        className="h-full w-full cursor-zoom-in"
      >
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
          aria-hidden
        />
      </button>
      {open ? (
        createPortal(
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${name} video`}
            tabIndex={-1}
            onClick={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
            }}
            className="fixed inset-0 z-[200] flex cursor-zoom-out items-center justify-center bg-black/90 p-4 outline-none md:p-10"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center border border-terminal-border bg-terminal-bg text-terminal-text transition-colors hover:border-terminal-signal hover:text-terminal-signal"
            >
              <X size={18} aria-hidden />
            </button>
            <video
              src={src}
              autoPlay
              controls
              playsInline
              className="max-h-full max-w-full object-contain"
            />
          </div>,
          document.body,
        )
      ) : null}
    </>
  );
}
