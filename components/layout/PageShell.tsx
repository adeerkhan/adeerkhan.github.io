import { GridSwizzle } from "@/components/primitives/GridSwizzle";

interface PageShellProps {
  children: React.ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="relative min-h-screen bg-terminal-bg">
      <GridSwizzle />
      <div className="relative z-10 mx-auto max-w-[1400px]">{children}</div>
    </div>
  );
}
