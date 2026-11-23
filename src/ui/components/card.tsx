import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";
import { Text } from "./text";

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function Card({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-(--card-pad) rounded-surface border py-(--card-pad) shadow-surface",
        className,
      )}
      {...props}
    />
  );
});

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-(--card-pad) has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-(--card-pad)",
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: Omit<HTMLAttributes<HTMLHeadingElement>, "color">) {
  return (
    <Text as="h3" variant="heading-md" data-slot="card-title" className={cn("leading-none font-semibold", className)} {...props} />
  );
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="card-description" className={cn("text-muted-foreground text-sm", className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="card-content" className={cn("px-(--card-pad)", className)} {...props} />;
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-(--card-pad) [.border-t]:pt-(--card-pad)", className)}
      {...props}
    />
  );
}
