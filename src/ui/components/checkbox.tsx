import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import type { ComponentProps } from "react";
import { cn } from "../lib/cn";
import { IconCheck, IconMinus } from "./icons";

/** Checkbox with a check/minus indicator. Pass `indeterminate` for the mixed state. */
export function Checkbox({ className, indeterminate, ...props }: ComponentProps<typeof BaseCheckbox.Root>) {
  return (
    <BaseCheckbox.Root
      data-slot="checkbox"
      indeterminate={indeterminate}
      className={cn(
        "inline-flex size-5 shrink-0 items-center justify-center rounded-md border border-field-border bg-field text-primary-foreground shadow-key outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-halo data-[checked]:border-primary data-[checked]:bg-primary data-[indeterminate]:border-primary data-[indeterminate]:bg-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[invalid]:border-destructive",
        className,
      )}
      {...props}
    >
      <BaseCheckbox.Indicator className="flex items-center justify-center">
        {indeterminate ? <IconMinus className="size-3.5" /> : <IconCheck className="size-3.5" />}
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
}