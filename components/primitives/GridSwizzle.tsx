"use client";

import { useEffect, useRef } from "react";

const CELL = 40;
const RADIUS = 90;
const AMPLITUDE = 14;
const DOT_RADIUS = 2;
const LERP = 0.35;

export function GridSwizzle() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let color = "#2A2A2A";
    let scrollY = window.scrollY;

    const readColor = () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--terminal-border")
        .trim() || color;

    // mouse in document coordinates (same as original)
    const mouse = { x: -9999, y: -9999 };
    const pos = { x: -9999, y: -9999 };

    const warp = (x: number, y: number) => {
      const dx = x - pos.x;
      const dy = y - pos.y;
      const d = Math.hypot(dx, dy);
      if (d >= RADIUS) return { x, y };
      const t = d / RADIUS;
      const falloff = (1 - t) * (1 - t);
      const a = Math.atan2(dy, dx) + t * 1.6;
      const amount = AMPLITUDE * falloff;
      return { x: x + Math.cos(a) * amount, y: y + Math.sin(a) * amount };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;

      // draw dots at document coordinates so they scroll with the page
      const top = Math.floor(scrollY / CELL) * CELL;
      const bottom = scrollY + height;
      for (let gx = 0; gx <= width; gx += CELL) {
        for (let gy = top; gy <= bottom; gy += CELL) {
          // screen position = document position - scroll offset
          const sx = gx;
          const sy = gy - scrollY;
          const p = warp(gx, gy);
          ctx.beginPath();
          ctx.arc(sx + (p.x - gx), sy + (p.y - gy), DOT_RADIUS, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    let raf = 0;
    let scheduled = false;
    let lastDrawX = -9999;
    let lastDrawY = -9999;
    const requestDraw = () => {
      const dx = pos.x - lastDrawX;
      const dy = pos.y - lastDrawY;
      if (dx * dx + dy * dy < 1) return;
      lastDrawX = pos.x;
      lastDrawY = pos.y;
      if (scheduled) return;
      scheduled = true;
      raf = requestAnimationFrame(() => {
        scheduled = false;
        draw();
      });
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX + window.scrollX;
      mouse.y = e.clientY + window.scrollY;
      pos.x += (mouse.x - pos.x) * LERP;
      pos.y += (mouse.y - pos.y) * LERP;
      requestDraw();
    };

    const onScroll = () => {
      scrollY = window.scrollY;
      requestDraw();
    };

    const onTheme = () => {
      color = readColor();
      draw();
    };

    const rebuild = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w === width && h === height) return;
      width = w;
      height = h;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      color = readColor();
      draw();
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", rebuild);
    window.addEventListener("themechange", onTheme);
    rebuild();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", rebuild);
      window.removeEventListener("themechange", onTheme);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0"
    />
  );
}
