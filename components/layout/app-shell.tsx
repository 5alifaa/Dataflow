import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface AppShellProps {
  children: ReactNode;
  className?: string;
}

export function AppShell({ children, className }: AppShellProps) {
  return (
    <div className="min-h-[100dvh] bg-[#fbfbfa]">
      <div
        className={cn(
          "mx-auto flex min-h-[100dvh] w-full max-w-7xl flex-col gap-7 px-4 py-6 sm:px-6 lg:px-8",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
