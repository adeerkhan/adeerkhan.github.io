import { GridSwizzle } from "@/components/primitives/GridSwizzle";

interface PageShellProps {
  children: React.ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="grid-overlay relative min-h-screen bg-terminal-bg">
      <GridSwizzle />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1] hidden bg-[repeating-linear-gradient(transparent_0px,transparent_1px,rgba(0,0,0,0.08)_1px,rgba(0,0,0,0.08)_2px)] md:block"
      />
      <div className="relative z-10 mx-auto max-w-[1400px]">{children}</div>
    </div>
  );
}
