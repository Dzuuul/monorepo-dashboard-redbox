"use client";
import * as React from "react";

import { cn } from "../../lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startAdornment, endAdornment, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Combine refs
    const combinedRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    return (
      <div className="relative flex items-center">
        {startAdornment && (
          <div className="absolute left-3 z-10 flex items-center">
            {startAdornment}
          </div>
        )}
        <input
          ref={combinedRef}
          type={type}
          data-slot="input"
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            startAdornment && "pl-10",
            endAdornment && "pr-10",
            className
          )}
          {...props}
        />
        {endAdornment && (
          <div className="absolute right-3 z-10 flex items-center">
            {endAdornment}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
