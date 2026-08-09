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

    let width = 0;
    let height = 0;
    let faint = "rgba(255,255,255,0.025)";
    let bright = "#2A2A2A";

    const readColor = (name: string, fallback: string) =>
      getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim() || fallback;

    const pageHeight = () =>
      Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        window.innerHeight,
      );

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = pageHeight();
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    let lastClientX = 0;
    let lastClientY = 0;
    const mouse = { x: -9999, y: -9999 };
    const pos = { x: -9999, y: -9999 };

    const onMove = (e: MouseEvent) => {
      lastClientX = e.clientX;
      lastClientY = e.clientY;
      mouse.x = e.clientX + window.scrollX;
      mouse.y = e.clientY + window.scrollY;
    };

    const syncScroll = () => {
      mouse.x = lastClientX + window.scrollX;
      mouse.y = lastClientY + window.scrollY;
    };

    const warp = (x: number, y: number, phase: number) => {
      const dx = x - pos.x;
      const dy = y - pos.y;
      const d = Math.hypot(dx, dy);
      if (d >= RADIUS) return { x, y };
      const t = d / RADIUS;
      const falloff = (1 - t) * (1 - t);
      const a = Math.atan2(dy, dx) + t * 2.4 + Math.sin(phase + t * 6) * 0.8;
      const amount = AMPLITUDE * falloff;
      return { x: x + Math.cos(a) * amount, y: y + Math.sin(a) * amount };
    };

    const nearCursor = (x: number, y: number) => {
      const dx = x - pos.x;
      const dy = y - pos.y;
      return dx * dx + dy * dy <= RADIUS * RADIUS;
    };

    const draw = (phase: number) => {
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = faint;
      ctx.lineWidth = 1;
      for (let gx = 0; gx <= width; gx += CELL) {
        ctx.beginPath();
        for (let gy = 0; gy <= height; gy += CELL) {
          const p = warp(gx, gy, phase);
          if (gy === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
      for (let gy = 0; gy <= height; gy += CELL) {
        ctx.beginPath();
        for (let gx = 0; gx <= width; gx += CELL) {
          const p = warp(gx, gy, phase);
          if (gx === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      ctx.strokeStyle = bright;
      for (let gx = 0; gx <= width; gx += CELL) {
        ctx.beginPath();
        for (let gy = 0; gy < height; gy += CELL) {
          const p1 = warp(gx, gy, phase);
          const p2 = warp(gx, gy + CELL, phase);
          if (nearCursor(gx, gy) || nearCursor(gx, gy + CELL)) {
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
          }
        }
        ctx.stroke();
      }
      for (let gy = 0; gy <= height; gy += CELL) {
        ctx.beginPath();
        for (let gx = 0; gx < width; gx += CELL) {
          const p1 = warp(gx, gy, phase);
          const p2 = warp(gx + CELL, gy, phase);
          if (nearCursor(gx, gy) || nearCursor(gx + CELL, gy)) {
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
          }
        }
        ctx.stroke();
      }
    };

    let raf = 0;
    const animate = () => {
      pos.x += (mouse.x - pos.x) * LERP;
      pos.y += (mouse.y - pos.y) * LERP;
      draw(performance.now() / 1000);
      raf = requestAnimationFrame(animate);
    };

    let lastHeight = pageHeight();
    const maybeResize = () => {
      const ph = pageHeight();
      if (ph !== lastHeight || width !== window.innerWidth) {
        lastHeight = ph;
        resize();
      }
    };

    resize();
    faint = readColor("--terminal-grid", faint);
    bright = readColor("--terminal-border", bright);
    const observer = new MutationObserver(() => {
      faint = readColor("--terminal-grid", faint);
      bright = readColor("--terminal-border", bright);
    });
    observer.observe(document.documentElement, { attributes: true });

    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", syncScroll);
    window.addEventListener("resize", maybeResize);
    const timer = window.setInterval(maybeResize, 700);
    raf = requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", syncScroll);
      window.removeEventListener("resize", maybeResize);
      window.clearInterval(timer);
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
