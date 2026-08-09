"use client";

import { useEffect, useRef } from "react";

const CELL = 40;
const RADIUS = 160;
const AMPLITUDE = 20;
const LERP = 0.25;

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

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const mouse = { x: width / 2, y: height / 2 };
    const pos = { x: width / 2, y: height / 2 };
    let hasMouse = false;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      hasMouse = true;
    };

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

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;

      for (let gx = 0; gx <= width; gx += CELL) {
        ctx.beginPath();
        for (let gy = 0; gy <= height; gy += CELL) {
          const p = warp(gx, gy);
          if (gy === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
      for (let gy = 0; gy <= height; gy += CELL) {
        ctx.beginPath();
        for (let gx = 0; gx <= width; gx += CELL) {
          const p = warp(gx, gy);
          if (gx === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
    };

    let raf = 0;
    const animate = () => {
      if (hasMouse) {
        pos.x += (mouse.x - pos.x) * LERP;
        pos.y += (mouse.y - pos.y) * LERP;
      }
      draw();
      raf = requestAnimationFrame(animate);
    };

    const onResize = () => {
      resize();
      pos.x = width / 2;
      pos.y = height / 2;
    };

    resize();
    color = readColor();
    const observer = new MutationObserver(() => {
      color = readColor();
    });
    observer.observe(document.documentElement, { attributes: true });

    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);
    raf = requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[2]"
    />
  );
}
