"use client";

import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  value: number;
  active: boolean;
}

export function ProgressBar({ value, active }: ProgressBarProps) {
  return <Progress value={active ? value : 0} aria-label={`${value}%`} />;
}
