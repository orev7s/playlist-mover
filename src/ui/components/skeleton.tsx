import { cn } from "../lib/cn";
import type { HTMLAttributes } from "react";

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="skeleton" className={cn("bg-accent animate-pulse rounded-control", className)} {...props} />;
}
