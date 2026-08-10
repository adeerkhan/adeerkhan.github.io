"use client";

import { useEffect, useRef } from "react";

const CELL = 40;
const RADIUS = 90;
const AMPLITUDE = 14;
const LINE_WIDTH = 1.5;
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
    let color = "rgba(255,255,255,0.03)";

    const readColor = () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--terminal-grid")
        .trim() || color;

    const mouse = { x: -9999, y: -9999 };
    const pos = { x: -9999, y: -9999 };
    let lastClientX = 0;
    let lastClientY = 0;

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
      ctx.strokeStyle = color;
      ctx.lineWidth = LINE_WIDTH;

      for (let gx = 0; gx <= width; gx += CELL) {
        ctx.beginPath();
        let started = false;
        for (let gy = 0; gy <= height; gy += CELL) {
          const p = warp(gx, gy);
          if (started) ctx.lineTo(p.x, p.y);
          else ctx.moveTo(p.x, p.y);
          started = true;
        }
        ctx.stroke();
      }
      for (let gy = 0; gy <= height; gy += CELL) {
        ctx.beginPath();
        let started = false;
        for (let gx = 0; gx <= width; gx += CELL) {
          const p = warp(gx, gy);
          if (started) ctx.lineTo(p.x, p.y);
          else ctx.moveTo(p.x, p.y);
          started = true;
        }
        ctx.stroke();
      }
    };

    let raf = 0;
    let scheduled = false;
    const requestDraw = () => {
      if (scheduled) return;
      scheduled = true;
      raf = requestAnimationFrame(() => {
        scheduled = false;
        draw();
      });
    };

    const onMove = (e: MouseEvent) => {
      lastClientX = e.clientX;
      lastClientY = e.clientY;
      mouse.x = lastClientX + window.scrollX;
      mouse.y = lastClientY + window.scrollY;
      pos.x += (mouse.x - pos.x) * LERP;
      pos.y += (mouse.y - pos.y) * LERP;
      requestDraw();
    };

    const onScroll = () => {
      pos.x = lastClientX + window.scrollX;
      pos.y = lastClientY + window.scrollY;
      requestDraw();
    };

    const onTheme = () => {
      color = readColor();
      draw();
    };

    const rebuild = () => {
      const w = window.innerWidth;
      const h = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        window.innerHeight,
      );
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

    const parent = canvas.parentElement;
    const ro = new ResizeObserver(() => rebuild());
    if (parent) ro.observe(parent);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("themechange", onTheme);
    rebuild();

    return () => {
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("themechange", onTheme);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 z-0"
    />
  );
}
