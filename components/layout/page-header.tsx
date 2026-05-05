"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react";

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
    <header className="grid gap-6 border-b border-stone-200 pb-7 pt-2 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
      <div className="max-w-3xl space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          {backHref ? (
            <Button asChild variant="ghost" size="sm">
              <Link href={backHref}>
                <ArrowLeft className="size-4" weight="bold" />
                Back
              </Link>
            </Button>
          ) : null}
          {eyebrow ? (
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
              {eyebrow}
            </span>
          ) : null}
          {badge ? <Badge>{badge}</Badge> : null}
        </div>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-[-0.03em] text-stone-950 sm:text-5xl">
            {title}
          </h1>
          <p className="max-w-2xl text-base leading-7 text-stone-600">
            {description}
          </p>
        </div>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
    </header>
  );
}
