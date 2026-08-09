"use client";

import { useEffect, useRef } from "react";

export function GridSwizzle() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;

    const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const lerp = (a: number, b: number, f: number) => a + (b - a) * f;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    let raf = 0;
    const animate = () => {
      pos.x = lerp(pos.x, mouse.x, 0.3);
      pos.y = lerp(pos.y, mouse.y, 0.3);
      el.style.left = `${pos.x}px`;
      el.style.top = `${pos.y}px`;
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} aria-hidden className="grid-swizzle" />;
}
