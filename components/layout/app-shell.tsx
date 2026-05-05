import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface AppShellProps {
  children: ReactNode;
  className?: string;
}

export function AppShell({ children, className }: AppShellProps) {
  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden bg-[#f7f3ea] text-stone-950">
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.9),rgba(247,243,234,0)_68%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(28,25,23,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(28,25,23,0.8)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div
        className={cn(
          "relative mx-auto flex min-h-[100dvh] w-full max-w-7xl flex-col gap-7 px-4 py-6 sm:px-6 lg:px-8",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
