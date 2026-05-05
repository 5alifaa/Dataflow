import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface AppShellProps {
  children: ReactNode;
  className?: string;
}

export function AppShell({ children, className }: AppShellProps) {
  return (
    <div className="min-h-[100dvh] bg-[#fbfbfa] bg-[radial-gradient(circle_at_12%_0%,rgba(251,243,219,0.55),transparent_30%),radial-gradient(circle_at_92%_18%,rgba(225,243,254,0.42),transparent_24%)]">
      <div
        className={cn(
          "mx-auto flex min-h-[100dvh] w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
