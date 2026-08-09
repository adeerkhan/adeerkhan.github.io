"use client";

import { useEffect, useRef, useState } from "react";

const DOT_SMOOTHNESS = 0.2;
const RING_SMOOTHNESS = 0.1;

export function SmoothCursor() {
  const mouse = useRef({ x: -100, y: -100 });
  const dot = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const [pos, setPos] = useState({ dot: { x: -100, y: -100 }, ring: { x: -100, y: -100 } });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("no-cursor");

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const onEnter = () => setHover(true);
    const onLeave = () => setHover(false);

    window.addEventListener("mousemove", onMove);
    const targets = document.querySelectorAll("a, button, input, textarea, select");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    let raf = 0;
    const animate = () => {
      dot.current.x = lerp(dot.current.x, mouse.current.x, DOT_SMOOTHNESS);
      dot.current.y = lerp(dot.current.y, mouse.current.y, DOT_SMOOTHNESS);
      ring.current.x = lerp(ring.current.x, mouse.current.x, RING_SMOOTHNESS);
      ring.current.y = lerp(ring.current.y, mouse.current.y, RING_SMOOTHNESS);
      setPos({
        dot: { x: dot.current.x, y: dot.current.y },
        ring: { x: ring.current.x, y: ring.current.y },
      });
      raf = requestAnimationFrame(animate);
    };
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
        className="absolute rounded-full bg-terminal-signal"
        style={{
          width: 8,
          height: 8,
          transform: "translate(-50%, -50%)",
          left: pos.dot.x,
          top: pos.dot.y,
        }}
      />
      <div
        className="absolute rounded-full border border-terminal-text"
        style={{
          width: hover ? 44 : 28,
          height: hover ? 44 : 28,
          transform: "translate(-50%, -50%)",
          left: pos.ring.x,
          top: pos.ring.y,
          transition: "width 0.3s, height 0.3s",
        }}
      />
    </div>
  );
}
