import { cva, type VariantProps } from "class-variance-authority";
import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

export const textVariants = cva("", {
  variants: {
    variant: {
      "heading-xl": "text-4xl font-bold tracking-tight lg:text-5xl",
      "heading-lg": "text-3xl font-bold tracking-tight",
      "heading-md": "text-2xl font-semibold tracking-tight",
      "heading-sm": "text-xl font-semibold tracking-tight",
      "text-lg": "text-lg",
      "text-md": "text-base",
      "text-sm": "text-sm",
      "text-xs": "text-xs",
    },
    color: {
      normal: "text-foreground",
      muted: "text-muted-foreground",
      destructive: "text-destructive",
    },
  },
  defaultVariants: { variant: "text-md", color: "normal" },
});

const HEADINGS: Record<string, ElementType> = {
  "heading-xl": "h1",
  "heading-lg": "h2",
  "heading-md": "h3",
  "heading-sm": "h4",
};

interface TextProps extends Omit<HTMLAttributes<HTMLElement>, "color">, VariantProps<typeof textVariants> {
  as?: ElementType;
  children?: ReactNode;
}

export function Text({ as, variant = "text-md", color, className, ...props }: TextProps) {
  const Tag = as ?? HEADINGS[variant as string] ?? "p";
  return <Tag className={cn(textVariants({ variant, color }), className)} {...props} />;
}
