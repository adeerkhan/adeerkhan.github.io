"use client";

import { useEffect, useState } from "react";

import { useInViewOnce } from "@/hooks/use-in-view-once";

export function useCountUp(target: number) {
  const { ref, isInView } = useInViewOnce();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 1400;
    const start = performance.now();
    const update = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * ease));
      if (progress < 1) requestAnimationFrame(update);
    };

    const frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target]);

  return { ref, count };
}
