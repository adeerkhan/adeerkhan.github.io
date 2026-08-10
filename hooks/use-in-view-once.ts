"use client";

import { useRef } from "react";
import { useInView, type UseInViewOptions } from "framer-motion";

export function useInViewOnce<T extends Element = HTMLDivElement>(
  margin: UseInViewOptions["margin"] = "-80px",
) {
  const ref = useRef<T>(null);
  const isInView = useInView(ref, { once: true, margin });
  return { ref, isInView };
}
