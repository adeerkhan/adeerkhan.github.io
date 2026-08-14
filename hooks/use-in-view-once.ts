"use client";

import { useEffect, useRef, useState } from "react";

export function useInViewOnce<T extends Element = HTMLDivElement>(
  margin = "-80px",
) {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin, threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  return { ref, isInView };
}
