"use client";

import { useEffect, useState } from "react";

const TYPE_MS = 55;
const DELETE_MS = 28;
const FULL_PAUSE_MS = 1800;
const EMPTY_PAUSE_MS = 400;

export function TypewriterText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const [deleting, setDeleting] = useState(false);
  const [reducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (reducedMotion) return;

    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && display === text) {
      timeout = setTimeout(() => setDeleting(true), FULL_PAUSE_MS);
    } else if (deleting && display === "") {
      timeout = setTimeout(() => setDeleting(false), EMPTY_PAUSE_MS);
    } else {
      timeout = setTimeout(
        () =>
          setDisplay(
            text.slice(0, display.length + (deleting ? -1 : 1)),
          ),
        deleting ? DELETE_MS : TYPE_MS,
      );
    }
    return () => clearTimeout(timeout);
  }, [display, deleting, text, reducedMotion]);

  return (
    <>
      {display}
      <span className="typewriter-cursor" aria-hidden>
        _
      </span>
    </>
  );
}
