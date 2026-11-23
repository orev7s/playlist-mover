import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-item border font-semibold [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary/12 text-primary border-primary/20",
        secondary: "bg-secondary text-secondary-foreground border-transparent",
        outline: "bg-transparent text-foreground border-border",
        muted: "bg-muted text-muted-foreground border-transparent",
        success: "bg-emerald-500/12 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
        warning: "bg-amber-500/12 text-amber-600 border-amber-500/20 dark:text-amber-400",
        destructive: "bg-destructive/12 text-destructive border-destructive/20",
      },
      size: {
        sm: "h-5 px-1.5 text-[11px]",
        default: "h-6 px-2 text-xs",
        lg: "h-7 px-2.5 text-sm",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

/** Small status pill. */
export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

interface BadgeRowProps extends HTMLAttributes<HTMLDivElement> {
  badges: Array<{ name: string; imageUrl: string }>;
}

/** Row of image badges, e.g. verification marks. */
export function BadgeRow({ badges, className, children, ...props }: BadgeRowProps) {
  return (
    <div className={cn("flex items-center gap-2 self-start rounded-item bg-muted/60 px-2 py-1.5", className)} {...props}>
      {children}
      {badges.map((badge) => (
        <img
          key={badge.name}
          src={badge.imageUrl}
          alt={badge.name}
          title={badge.name}
          width={24}
          height={24}
          loading="lazy"
          className="size-6 object-contain"
        />
      ))}
    </div>
  );
}
