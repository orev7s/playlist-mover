import type { CSSProperties } from "react";

/** Staggered entrance for list items, used with the `animate-reveal` class. Capped so long lists don't drag. */
export const revealStyle = (index = 0): CSSProperties =>
  ({
    "--reveal-delay": `${Math.min(index, 12) * 35}ms`,
    "--reveal-duration": "450ms",
    "--reveal-offset": "8px",
    "--reveal-blur": "4px",
  }) as CSSProperties;
