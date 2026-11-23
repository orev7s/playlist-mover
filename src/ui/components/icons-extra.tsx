// Additional 20x20 stroke icons, same grid and stroke as ./icons so the two
// files look like one set. Import from either; both re-export at the top level.
import { Base, stroke, type IconProps } from "./icons";

export const IconChevronUp = (p: IconProps) => (
  <Base {...p}>
    <polyline points="3.5 13 10 6.5 16.5 13" {...stroke} />
  </Base>
);

export const IconChevronLeft = (p: IconProps) => (
  <Base {...p}>
    <polyline points="12.5 3.5 6 10 12.5 16.5" {...stroke} />
  </Base>
);

export const IconArrowRight = (p: IconProps) => (
  <Base {...p}>
    <line x1="3" y1="10" x2="16" y2="10" {...stroke} data-color="color-2" />
    <polyline points="11 5 16 10 11 15" {...stroke} />
  </Base>
);

export const IconArrowUpRight = (p: IconProps) => (
  <Base {...p}>
    <line x1="5.5" y1="14.5" x2="14" y2="6" {...stroke} data-color="color-2" />
    <polyline points="7 6 14 6 14 13" {...stroke} />
  </Base>
);

export const IconArrowUp = (p: IconProps) => (
  <Base {...p}>
    <line x1="10" y1="17" x2="10" y2="4" {...stroke} data-color="color-2" />
    <polyline points="4.5 9.5 10 4 15.5 9.5" {...stroke} />
  </Base>
);

export const IconArrowDown = (p: IconProps) => (
  <Base {...p}>
    <line x1="10" y1="3" x2="10" y2="16" {...stroke} data-color="color-2" />
    <polyline points="4.5 10.5 10 16 15.5 10.5" {...stroke} />
  </Base>
);

export const IconSearch = (p: IconProps) => (
  <Base {...p}>
    <circle cx="8.75" cy="8.75" r="5.25" {...stroke} data-color="color-2" />
    <line x1="12.5" y1="12.5" x2="16.75" y2="16.75" {...stroke} />
  </Base>
);

export const IconStar = (p: IconProps) => (
  <Base {...p}>
    <polygon points="10 2.75 12.35 7.5 17.5 8.2 13.75 11.85 14.7 17 10 14.55 5.3 17 6.25 11.85 2.5 8.2 7.65 7.5" {...stroke} />
  </Base>
);

export const IconHeart = (p: IconProps) => (
  <Base {...p}>
    <path d="M10 16.25c-4-3-6.25-5.35-6.25-8.05C3.75 6.3 5.2 4.75 7.1 4.75c1.15 0 2.2.57 2.9 1.5.7-.93 1.75-1.5 2.9-1.5 1.9 0 3.35 1.55 3.35 3.45 0 2.7-2.25 5.05-6.25 8.05Z" {...stroke} />
  </Base>
);

export const IconBell = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 8.25a4 4 0 0 1 8 0c0 2.9.75 4.1 1.5 4.9H4.5c.75-.8 1.5-2 1.5-4.9Z" {...stroke} data-color="color-2" />
    <path d="M8.25 15.75a1.9 1.9 0 0 0 3.5 0" {...stroke} />
  </Base>
);

export const IconMail = (p: IconProps) => (
  <Base {...p}>
    <rect x="2.5" y="4.5" width="15" height="11" rx="2" {...stroke} />
    <polyline points="3.5 6.25 10 11 16.5 6.25" {...stroke} data-color="color-2" />
  </Base>
);

export const IconLock = (p: IconProps) => (
  <Base {...p}>
    <rect x="4.5" y="9" width="11" height="7.5" rx="2" {...stroke} />
    <path d="M7 9V7a3 3 0 0 1 6 0v2" {...stroke} data-color="color-2" />
  </Base>
);

export const IconEye = (p: IconProps) => (
  <Base {...p}>
    <path d="M2.5 10S5 5.25 10 5.25 17.5 10 17.5 10 15 14.75 10 14.75 2.5 10 2.5 10Z" {...stroke} />
    <circle cx="10" cy="10" r="2.25" {...stroke} data-color="color-2" />
  </Base>
);

export const IconSettings = (p: IconProps) => (
  <Base {...p}>
    <circle cx="10" cy="10" r="2.5" {...stroke} />
    <path d="M10 3v2.1M10 14.9V17M3 10h2.1M14.9 10H17M5.05 5.05l1.5 1.5M13.45 13.45l1.5 1.5M14.95 5.05l-1.5 1.5M6.55 13.45l-1.5 1.5" {...stroke} data-color="color-2" />
  </Base>
);

export const IconTrash = (p: IconProps) => (
  <Base {...p}>
    <polyline points="3.5 6 16.5 6" {...stroke} data-color="color-2" />
    <line x1="8" y1="6" x2="8" y2="3.75" {...stroke} data-color="color-2" />
    <line x1="12" y1="6" x2="12" y2="3.75" {...stroke} data-color="color-2" />
    <path d="M5.5 6l.9 10.25c0 .69.59 1.25 1.3 1.25h4.6c.71 0 1.3-.56 1.3-1.25L14.5 6" {...stroke} />
  </Base>
);

export const IconCopy = (p: IconProps) => (
  <Base {...p}>
    <rect x="7.5" y="7.5" width="9" height="9" rx="2" {...stroke} />
    <path d="M12.5 7.5V5.5a2 2 0 0 0-2-2H5.5a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h2" {...stroke} data-color="color-2" />
  </Base>
);

export const IconSun = (p: IconProps) => (
  <Base {...p}>
    <circle cx="10" cy="10" r="3.5" {...stroke} />
    <path d="M10 2.5v1.8M10 15.7v1.8M2.5 10h1.8M15.7 10h1.8M4.7 4.7l1.3 1.3M14 14l1.3 1.3M15.3 4.7L14 6M6 14l-1.3 1.3" {...stroke} data-color="color-2" />
  </Base>
);

export const IconMoon = (p: IconProps) => (
  <Base {...p}>
    <path d="M16.5 11.75A6.75 6.75 0 0 1 8.25 3.5a6.75 6.75 0 1 0 8.25 8.25Z" {...stroke} />
  </Base>
);

export const IconSparkles = (p: IconProps) => (
  <Base {...p}>
    <path d="M10 2.75 11.6 7.4 16.25 9 11.6 10.6 10 15.25 8.4 10.6 3.75 9 8.4 7.4Z" {...stroke} />
    <path d="M15.5 14.5l.6 1.65L17.75 16.75 16.1 17.35 15.5 19 14.9 17.35 13.25 16.75 14.9 16.15Z" {...stroke} data-color="color-2" />
  </Base>
);

export const IconCalendar = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="5" width="14" height="12" rx="2" {...stroke} />
    <line x1="3" y1="8.5" x2="17" y2="8.5" {...stroke} data-color="color-2" />
    <line x1="6.5" y1="3" x2="6.5" y2="5.5" {...stroke} data-color="color-2" />
    <line x1="13.5" y1="3" x2="13.5" y2="5.5" {...stroke} data-color="color-2" />
  </Base>
);

export const IconClock = (p: IconProps) => (
  <Base {...p}>
    <circle cx="10" cy="10" r="7" {...stroke} />
    <polyline points="10 5.75 10 10.5 13.5 12.5" {...stroke} data-color="color-2" />
  </Base>
);

export const IconGlobe = (p: IconProps) => (
  <Base {...p}>
    <circle cx="10" cy="10" r="7" {...stroke} data-color="color-2" />
    <line x1="3" y1="10" x2="17" y2="10" {...stroke} />
    <path d="M10 3c2 2.2 2 11.8 0 14M10 3c-2 2.2-2 11.8 0 14" {...stroke} />
  </Base>
);

export const IconZap = (p: IconProps) => (
  <Base {...p}>
    <polygon points="10.5 2.5 4 11 9 11 8.5 17.5 15.5 9 10.5 9" {...stroke} />
  </Base>
);

export const IconUpload = (p: IconProps) => (
  <Base {...p}>
    <polyline points="6.75 7 10 3.75 13.25 7" {...stroke} data-color="color-2" />
    <line x1="10" y1="3.75" x2="10" y2="13" {...stroke} data-color="color-2" />
    <path d="M4.5 12.75v1.75a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-1.75" {...stroke} />
  </Base>
);

export const IconFilter = (p: IconProps) => (
  <Base {...p}>
    <polygon points="3 5 17 5 11.5 11.25 11.5 16 8.5 14.5 8.5 11.25" {...stroke} />
  </Base>
);

export const IconMoreHorizontal = (p: IconProps) => (
  <Base {...p}>
    <circle cx="5" cy="10" r="1.3" fill="currentColor" />
    <circle cx="10" cy="10" r="1.3" fill="currentColor" />
    <circle cx="15" cy="10" r="1.3" fill="currentColor" />
  </Base>
);

export const IconQuote = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 10.5c0-3.1 1.9-5.2 4.5-5.75M8.5 10.5v5H4v-5ZM12 10.5c0-3.1 1.9-5.2 4.5-5.75M16.5 10.5v5H12v-5Z" {...stroke} />
  </Base>
);

export const IconPlay = (p: IconProps) => (
  <Base {...p}>
    <polygon points="7 4 16 10 7 16" {...stroke} />
  </Base>
);

export const IconLink = (p: IconProps) => (
  <Base {...p}>
    <path d="M9 11a3 3 0 0 0 4.25 0l2.5-2.5a3 3 0 0 0-4.25-4.25L10.4 5.35" {...stroke} />
    <path d="M11 9a3 3 0 0 0-4.25 0l-2.5 2.5a3 3 0 0 0 4.25 4.25l1.1-1.1" {...stroke} data-color="color-2" />
  </Base>
);

export const IconRefresh = (p: IconProps) => (
  <Base {...p}>
    <path d="M16.5 10a6.5 6.5 0 1 1-1.9-4.6" {...stroke} />
    <polyline points="16.5 2.5 16.5 6 13 6" {...stroke} data-color="color-2" />
  </Base>
);
