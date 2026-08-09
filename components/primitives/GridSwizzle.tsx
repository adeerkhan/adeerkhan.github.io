"use client";

import { useEffect, useRef } from "react";

export function GridSwizzle() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;

    el.style.animationPlayState = "paused";
    let idleTimer: ReturnType<typeof setTimeout>;

    const onMove = (e: MouseEvent) => {
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      el.style.animationPlayState = "running";
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        el.style.animationPlayState = "paused";
      }, 700);
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      clearTimeout(idleTimer);
    };
  }, []);

  return <div ref={ref} aria-hidden className="grid-swizzle" />;
}
