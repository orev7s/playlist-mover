import type { SVGProps } from "react";
import { cn } from "../lib/cn";

interface SpinnerProps extends Omit<SVGProps<SVGSVGElement>, "size"> {
  size?: number | string;
}

/** Indeterminate loading indicator. */
export function Spinner({ className, size = 16, ...props }: SpinnerProps) {
  return (
    <svg
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn("animate-spin", className)}
      {...props}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity={0.25} strokeWidth={3} />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth={3} strokeLinecap="round" />
    </svg>
  );
}
