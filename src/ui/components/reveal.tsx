import { cn } from "../lib/cn";
import type { CSSProperties, HTMLAttributes } from "react";

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  delay?: number;
  duration?: number;
  blur?: number;
  offset?: number;
}

/** Entrance animation: fade + blur + rise via the `animate-reveal` utility. */
export function Reveal({ delay = 0, duration = 700, blur = 10, offset = 0.4, className, style, ...props }: RevealProps) {
  const vars = {
    "--reveal-duration": `${duration}ms`,
    "--reveal-blur": `${blur}px`,
    "--reveal-offset": `${offset}em`,
    "--reveal-scale": 1,
    "--reveal-opacity": 0,
    "--reveal-delay": `${delay}ms`,
  } as CSSProperties;
  return <div className={cn("animate-reveal", className)} style={{ ...vars, ...style }} {...props} />;
}
