import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description: string;
  backHref?: string;
  badge?: string;
  actions?: ReactNode;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  backHref,
  badge,
  actions,
}: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-5 rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.45)] backdrop-blur lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          {backHref ? (
            <Button asChild variant="ghost" size="sm">
              <Link href={backHref}>
                <ArrowLeft className="size-4" />
                Back
              </Link>
            </Button>
          ) : null}
          {eyebrow ? (
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
              {eyebrow}
            </span>
          ) : null}
          {badge ? <Badge>{badge}</Badge> : null}
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
            {title}
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-stone-600 sm:text-base">
            {description}
          </p>
        </div>
      </div>
      {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
    </header>
  );
}
