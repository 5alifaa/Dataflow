import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-normal",
  {
    variants: {
      variant: {
        default: "bg-stone-100 text-stone-700",
        success: "bg-[#edf3ec] text-[#346538]",
        warning: "bg-[#fbf3db] text-[#956400]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  ...props
}: HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge };
