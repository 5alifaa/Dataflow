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
  const hasMeta = Boolean(eyebrow || badge);

  return (
    <header className="overflow-hidden rounded-lg border border-white/70 bg-white/75 shadow-[0_18px_70px_rgba(28,25,23,0.055)] backdrop-blur">
      <div className="flex items-center justify-between gap-4 border-b border-stone-950/10 px-4 py-3 sm:px-5">
        <Link
          href="/"
          className="text-sm font-semibold tracking-normal text-stone-950"
        >
          DataFlow
        </Link>
        {backHref ? (
          <Button asChild variant="ghost" size="sm">
            <Link href={backHref}>
              <ArrowLeft className="size-4" weight="bold" />
              Home
            </Link>
          </Button>
        ) : null}
      </div>

      <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="max-w-4xl space-y-5">
          {hasMeta ? (
            <div className="flex flex-wrap items-center gap-3">
              {eyebrow ? (
                <span className="text-xs font-semibold uppercase tracking-normal text-stone-500">
                  {eyebrow}
                </span>
              ) : null}
              {badge ? <Badge>{badge}</Badge> : null}
            </div>
          ) : null}

          <div className="space-y-3">
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-normal text-stone-950 sm:text-6xl">
              {title}
            </h1>
            <p className="max-w-2xl text-base leading-7 text-stone-600">
              {description}
            </p>
          </div>
        </div>

        {actions ? (
          <div className="flex flex-wrap items-center gap-3">{actions}</div>
        ) : null}
      </div>
    </header>
  );
}
