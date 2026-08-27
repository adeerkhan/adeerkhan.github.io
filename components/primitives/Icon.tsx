import { icons } from "@/lib/icons-data";

import { cn } from "@/lib/utils";

interface IconProps {
  icon: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
  "aria-hidden"?: boolean;
}

export function Icon({
  icon,
  width = 24,
  height = 24,
  className,
  style,
}: IconProps) {
  const data = icons[icon as keyof typeof icons];
  if (!data) return null;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={data.vb}
      width={width}
      height={height}
      fill="currentColor"
      className={cn("shrink-0", className)}
      style={style}
      aria-hidden
      dangerouslySetInnerHTML={{ __html: data.body }}
    />
  );
}
