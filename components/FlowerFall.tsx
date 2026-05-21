"use client";

import { useEffect, useMemo, useRef } from "react";

type Flower = {
  x: number;
  y: number;
  size: number;
  fallSpeed: number;
  driftSpeed: number;
  rotation: number;
  rotationSpeed: number;
  swayAmplitude: number;
  swaySpeed: number;
  phase: number;
  alpha: number;
  variant: 0 | 1 | 2;
  colorIndex: 0 | 1;
};

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

export default function FlowerFall({
  enabled = true,
  variant = "mixed",
}: {
  enabled?: boolean;
  variant?: "mixed" | 0 | 1 | 2;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const isReducedMotion = useMemo(() => prefersReducedMotion(), []);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let flowers: Flower[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;

    let petalWhite = "rgba(255, 255, 255, 0.85)";
    let petalPink = "rgba(251, 207, 232, 0.85)";

    let lastT = 0;

    const pickVariant = (): 0 | 1 | 2 => {
      if (variant === 0 || variant === 1 || variant === 2) return variant;
      const r = Math.random();
      if (r < 0.34) return 0;
      if (r < 0.67) return 1;
      return 2;
    };

    const randomSize = () => 8 + Math.random() * 14;

    const drawPetal = (f: Flower) => {
      // Variants change the aspect and curvature of the petal.
      const w = f.variant === 0 ? 0.75 : f.variant === 1 ? 0.9 : 1.05;
      const h = f.variant === 0 ? 1.25 : f.variant === 1 ? 1.1 : 0.95;
      const pinch = f.variant === 0 ? 0.44 : f.variant === 1 ? 0.36 : 0.28;
      const s = f.size;
      const halfW = (s * w) / 2;
      const halfH = (s * h) / 2;

      ctx.beginPath();
      ctx.moveTo(0, -halfH);
      ctx.quadraticCurveTo(halfW, -halfH * pinch, 0, halfH);
      ctx.quadraticCurveTo(-halfW, -halfH * pinch, 0, -halfH);
      ctx.closePath();

      ctx.fill();

      // subtle center vein using same color, lower alpha (no extra colors)
      const before = ctx.globalAlpha;
      ctx.globalAlpha = before * 0.35;
      ctx.lineWidth = Math.max(0.8, s * 0.03);
      ctx.beginPath();
      ctx.moveTo(0, -halfH * 0.85);
      ctx.quadraticCurveTo(0, 0, 0, halfH * 0.85);
      ctx.stroke();
      ctx.globalAlpha = before;
    };

    const createFlower = (): Flower => {
      const size = randomSize();
      return {
        x: Math.random() * width,
        y: Math.random() * height - height * 0.2,
        size,
        fallSpeed: 22 + Math.random() * 58,
        driftSpeed: -10 + Math.random() * 20,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (-0.9 + Math.random() * 1.8) * 0.9,
        swayAmplitude: 8 + Math.random() * 22,
        swaySpeed: 0.6 + Math.random() * 1.4,
        phase: Math.random() * Math.PI * 2,
        alpha: 0.45 + Math.random() * 0.45,
        variant: pickVariant(),
        colorIndex: Math.random() < 0.5 ? 0 : 1,
      };
    };

    const createFlowers = () => {
      const area = width * height;
      const count = Math.max(18, Math.min(60, Math.round(area / 22000)));
      flowers = new Array(count).fill(null).map(() => createFlower());
    };

    const resize = () => {
      const nextWidth = Math.max(1, window.innerWidth);
      const nextHeight = Math.max(1, window.innerHeight);
      const nextDpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

      width = nextWidth;
      height = nextHeight;
      dpr = nextDpr;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      createFlowers();
    };

    const draw = (tMs: number) => {
      ctx.clearRect(0, 0, width, height);

      // If we couldn't resolve usable colors, skip drawing (keeps effect safe).
      if (!petalWhite && !petalPink) return;

      const t = tMs / 1000;

      for (const f of flowers) {
        const color = f.colorIndex === 1 ? petalPink : petalWhite;
        if (!color) continue;
        ctx.fillStyle = color;
        ctx.strokeStyle = color;

        const sway = Math.sin(t * f.swaySpeed + f.phase) * f.swayAmplitude;
        const x = f.x + sway;

        ctx.save();
        ctx.globalAlpha = f.alpha;
        ctx.translate(x, f.y);
        ctx.rotate(f.rotation);
        drawPetal(f);
        ctx.restore();
      }

      ctx.globalAlpha = 1;
    };

    const step = (tMs: number) => {
      if (!lastT) lastT = tMs;
      const dt = Math.min(0.04, Math.max(0.001, (tMs - lastT) / 1000));
      lastT = tMs;

      for (const f of flowers) {
        f.y += f.fallSpeed * dt;
        f.x += f.driftSpeed * dt;
        f.rotation += f.rotationSpeed * dt;

        const margin = 60;
        if (f.y > height + margin) {
          f.y = -margin - Math.random() * height * 0.2;
          f.x = Math.random() * width;
          f.size = randomSize();
          f.fallSpeed = 22 + Math.random() * 58;
          f.driftSpeed = -10 + Math.random() * 20;
          f.rotationSpeed = (-0.9 + Math.random() * 1.8) * 0.9;
          f.swayAmplitude = 8 + Math.random() * 22;
          f.swaySpeed = 0.6 + Math.random() * 1.4;
          f.phase = Math.random() * Math.PI * 2;
          f.alpha = 0.45 + Math.random() * 0.45;
          f.variant = pickVariant();
          f.colorIndex = Math.random() < 0.5 ? 0 : 1;
        }

        if (f.x < -margin) f.x = width + margin;
        if (f.x > width + margin) f.x = -margin;
      }

      draw(tMs);
      rafIdRef.current = window.requestAnimationFrame(step);
    };

    const start = () => {
      resize();
      rafIdRef.current = window.requestAnimationFrame(step);
    };

    const onResize = () => {
      resize();
      draw(performance.now());
    };

    window.addEventListener("resize", onResize, { passive: true });

    start();

    // Best-effort update if theme changes (dark/light) so petals keep matching text color.
    const onThemeChange = () => {
      draw(performance.now());
    };
    window.matchMedia?.("(prefers-color-scheme: dark)")?.addEventListener?.("change", onThemeChange);
    window.matchMedia?.("(prefers-color-scheme: light)")?.addEventListener?.("change", onThemeChange);

    return () => {
      window.removeEventListener("resize", onResize);

      window.matchMedia?.("(prefers-color-scheme: dark)")?.removeEventListener?.("change", onThemeChange);
      window.matchMedia?.("(prefers-color-scheme: light)")?.removeEventListener?.("change", onThemeChange);

      if (rafIdRef.current != null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [enabled, variant]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
