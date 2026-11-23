import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

const alertVariants = cva(
  "relative flex w-full items-start gap-3 rounded-surface border p-4 text-sm [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 [&_svg]:mt-0.5",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground border-border",
        info: "bg-primary/8 text-foreground border-primary/20 [&_svg]:text-primary",
        success: "bg-emerald-500/10 text-foreground border-emerald-500/25 [&_svg]:text-emerald-600 dark:[&_svg]:text-emerald-400",
        warning: "bg-amber-500/10 text-foreground border-amber-500/25 [&_svg]:text-amber-600 dark:[&_svg]:text-amber-400",
        destructive: "bg-destructive/10 text-foreground border-destructive/25 [&_svg]:text-destructive",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

interface AlertProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {}

export function Alert({ className, variant, ...props }: AlertProps) {
  return <div data-slot="alert" role="alert" className={cn(alertVariants({ variant }), className)} {...props} />;
}

export function AlertTitle({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="alert-title" className={cn("font-semibold leading-snug", className)} {...props} />;
}

export function AlertDescription({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="alert-description" className={cn("text-muted-foreground text-sm", className)} {...props} />;
}
