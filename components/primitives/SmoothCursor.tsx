"use client";

import { useEffect, useRef } from "react";

const DOT_SMOOTHNESS = 0.35;
const RING_SMOOTHNESS = 0.3;
const IDLE_MS = 400;

export function SmoothCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("no-cursor");

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const mouse = { x: -100, y: -100 };
    const dotPos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let hovering = false;

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      lastMove = performance.now();
      if (!raf) raf = requestAnimationFrame(animate);
    };
    const onEnter = () => {
      hovering = true;
    };
    const onLeave = () => {
      hovering = false;
    };

    const targets = document.querySelectorAll("a, button, input, textarea, select");

    let raf = 0;
    let lastMove = performance.now();
    const animate = () => {
      raf = 0;
      dotPos.x = lerp(dotPos.x, mouse.x, DOT_SMOOTHNESS);
      dotPos.y = lerp(dotPos.y, mouse.y, DOT_SMOOTHNESS);
      ringPos.x = lerp(ringPos.x, mouse.x, RING_SMOOTHNESS);
      ringPos.y = lerp(ringPos.y, mouse.y, RING_SMOOTHNESS);
      dot.style.transform = `translate(${dotPos.x}px, ${dotPos.y}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`;
      if (hovering && ring.style.width !== "44px") {
        ring.style.width = "44px";
        ring.style.height = "44px";
      } else if (!hovering && ring.style.width !== "28px") {
        ring.style.width = "28px";
        ring.style.height = "28px";
      }
      if (performance.now() - lastMove < IDLE_MS) {
        raf = requestAnimationFrame(animate);
      }
    };

    window.addEventListener("mousemove", onMove);
    targets.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    raf = requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove("no-cursor");
      window.removeEventListener("mousemove", onMove);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <div
        ref={dotRef}
        className="absolute rounded-full bg-terminal-signal"
        style={{ width: 8, height: 8 }}
      />
      <div
        ref={ringRef}
        className="absolute rounded-full border border-terminal-text"
        style={{
          width: 28,
          height: 28,
          transition: "width 0.3s, height 0.3s",
        }}
      />
    </div>
  );
}
