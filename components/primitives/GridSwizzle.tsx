"use client";

import { useEffect, useRef } from "react";

const CELL = 40;
const RADIUS = 60;
const AMPLITUDE = 18;
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

    const grid = document.createElement("canvas");
    const gctx = grid.getContext("2d");

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
      const a = Math.atan2(dy, dx) + t * 2.4;
      const amount = AMPLITUDE * falloff;
      return { x: x + Math.cos(a) * amount, y: y + Math.sin(a) * amount };
    };

    const inRange = (x: number, y: number) => {
      const dx = x - pos.x;
      const dy = y - pos.y;
      return dx * dx + dy * dy <= RADIUS * RADIUS;
    };

    const paintGrid = () => {
      if (!gctx) return;
      const dpr = window.devicePixelRatio || 1;
      grid.width = Math.floor(width * dpr);
      grid.height = Math.floor(height * dpr);
      gctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gctx.strokeStyle = color;
      gctx.lineWidth = 1;
      for (let gx = 0; gx <= width; gx += CELL) {
        gctx.beginPath();
        for (let gy = 0; gy <= height; gy += CELL) {
          if (gy === 0) gctx.moveTo(gx, gy);
          else gctx.lineTo(gx, gy);
        }
        gctx.stroke();
      }
      for (let gy = 0; gy <= height; gy += CELL) {
        gctx.beginPath();
        for (let gx = 0; gx <= width; gx += CELL) {
          if (gx === 0) gctx.moveTo(gx, gy);
          else gctx.lineTo(gx, gy);
        }
        gctx.stroke();
      }
    };

    const draw = () => {
      if (!gctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(grid, 0, 0, width, height);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;

      const gx0 = Math.max(0, Math.floor((pos.x - RADIUS) / CELL)) * CELL;
      const gy0 = Math.max(0, Math.floor((pos.y - RADIUS) / CELL)) * CELL;
      const gx1 = Math.min(width, Math.ceil((pos.x + RADIUS) / CELL) * CELL);
      const gy1 = Math.min(height, Math.ceil((pos.y + RADIUS) / CELL) * CELL);
      if (gx1 <= gx0 || gy1 <= gy0) return;

      for (let gx = gx0; gx <= gx1; gx += CELL) {
        ctx.beginPath();
        for (let gy = gy0; gy <= gy1; gy += CELL) {
          const p1 = warp(gx, gy);
          const p2 = warp(gx, gy + CELL);
          if (inRange(gx, gy) || inRange(gx, gy + CELL)) {
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
          }
        }
        ctx.stroke();
      }
      for (let gy = gy0; gy <= gy1; gy += CELL) {
        ctx.beginPath();
        for (let gx = gx0; gx <= gx1; gx += CELL) {
          const p1 = warp(gx, gy);
          const p2 = warp(gx + CELL, gy);
          if (inRange(gx, gy) || inRange(gx + CELL, gy)) {
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
          }
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
      paintGrid();
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
      paintGrid();
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
