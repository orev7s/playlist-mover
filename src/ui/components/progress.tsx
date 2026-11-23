import { Progress as BaseProgress } from "@base-ui/react/progress";
import type { ComponentProps } from "react";
import { cn } from "../lib/cn";

/** Progress bar. Pass `value={null}` for the indeterminate state. */
export function Progress({ className, value, max = 100, ...props }: ComponentProps<typeof BaseProgress.Root>) {
  return (
    <BaseProgress.Root value={value} max={max} data-slot="progress" className={cn("w-full", className)} {...props}>
      <BaseProgress.Track className="relative h-2 w-full overflow-hidden rounded-full bg-muted data-[indeterminate]:animate-pulse">
        <BaseProgress.Indicator className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out data-[indeterminate]:w-1/3" />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}