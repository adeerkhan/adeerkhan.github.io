import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap border border-terminal-signal px-5 py-2 font-mono text-xs uppercase tracking-widest text-terminal-signal transition-colors duration-200 hover:bg-terminal-signal hover:text-terminal-bg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-terminal-signal disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
