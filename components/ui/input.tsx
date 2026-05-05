import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 transition-[border-color,box-shadow] file:mr-3 file:cursor-pointer file:rounded file:border-0 file:bg-stone-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-stone-800 placeholder:text-stone-400 focus-visible:border-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950/10 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
