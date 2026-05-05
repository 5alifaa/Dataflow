"use client";
/* eslint-disable @next/next/no-img-element */

import { ImageBroken } from "@phosphor-icons/react";
import { useState } from "react";

import { IMAGE_THUMBNAIL_SIZE } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ImageThumbnailCellProps {
  value: string | null;
}

export function ImageThumbnailCell({ value }: ImageThumbnailCellProps) {
  const [failed, setFailed] = useState(false);

  if (!value || failed) {
    return (
      <div className="flex h-full items-center">
        <div className="flex items-center gap-2 rounded-lg border border-dashed border-stone-200 bg-stone-50 px-2 py-1 text-xs text-stone-500">
          <ImageBroken className="size-3.5" weight="bold" />
          Placeholder
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full items-center">
      <img
        src={value}
        alt=""
        loading="lazy"
        width={IMAGE_THUMBNAIL_SIZE}
        height={IMAGE_THUMBNAIL_SIZE}
        className={cn(
          "rounded-lg border border-stone-200 bg-stone-100 object-cover",
        )}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
