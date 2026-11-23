import type { SVGProps } from "react";

export const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 2,
} as const;

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  size?: number | string;
  title?: string;
}

export function Base({ children, size = 20, width, height, title, ...props }: IconProps & { children?: React.ReactNode }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width ?? size} height={height ?? size} viewBox="0 0 20 20" {...props}>
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export const IconLogin = (p: IconProps) => (
  <Base {...p}>
    <polyline points="11 7 14 10 11 13" {...stroke} data-color="color-2" />
    <line x1="3" y1="10" x2="14" y2="10" {...stroke} data-color="color-2" />
    <path d="m8,6c0-1.657,1.343-3,3-3h3c1.657,0,3,1.343,3,3v8c0,1.657-1.343,3-3,3h-3c-1.657,0-3-1.343-3-3" {...stroke} />
  </Base>
);

export const IconLogout = (p: IconProps) => (
  <Base {...p}>
    <polyline points="6 13 3 10 6 7" {...stroke} data-color="color-2" />
    <line x1="12" y1="10" x2="3" y2="10" {...stroke} data-color="color-2" />
    <path
      d="m8.475,15.475c-.016.016-.034.026-.05.041.522.884,1.474,1.484,2.575,1.484h3c1.657,0,3-1.343,3-3V6c0-1.657-1.343-3-3-3h-3c-1.101,0-2.053.6-2.575,1.484"
      {...stroke}
    />
  </Base>
);

export const IconMenu = (p: IconProps) => (
  <Base {...p}>
    <line x1="17" y1="7" x2="3" y2="7" {...stroke} />
    <line x1="17" y1="13" x2="3" y2="13" {...stroke} data-color="color-2" />
  </Base>
);

export const IconChevronDown = (p: IconProps) => (
  <Base {...p}>
    <polyline points="3.5 7.5 10 14 16.5 7.5" {...stroke} />
  </Base>
);

export const IconChevronRight = (p: IconProps) => (
  <Base {...p}>
    <polyline points="7.5 3.5 14 10 7.5 16.5" {...stroke} />
  </Base>
);

export const IconUser = (p: IconProps) => (
  <Base {...p}>
    <circle cx="10" cy="6" r="3" {...stroke} data-color="color-2" />
    <path d="m4,15.393c1.225-2.033,3.454-3.393,6-3.393s4.775,1.36,6,3.393" {...stroke} />
  </Base>
);

export const IconShield = (p: IconProps) => (
  <Base {...p}>
    <path d="m4,5l6-2,6,2v7c0,4-6,5-6,5,0,0-6-1-6-5v-7Z" {...stroke} />
  </Base>
);

export const IconBook = (p: IconProps) => (
  <Base {...p}>
    <line x1="8" y1="5" x2="8" y2="17" {...stroke} />
    <path d="m4,7v-.9164c0-1.485,1.0864-2.7465,2.555-2.9668l7.445-1.1168" {...stroke} data-color="color-2" />
    <rect x="4" y="5" width="12" height="12" rx="2" ry="2" {...stroke} />
    <rect x="11" y="9" width="2" height="1" {...stroke} data-color="color-2" />
  </Base>
);

export const IconBookmark = (p: IconProps) => (
  <Base {...p}>
    <path d="m16,17l-6-4-6,4V6c0-1.657,1.343-3,3-3h6c1.657,0,3,1.343,3,3v11Z" {...stroke} />
  </Base>
);

export const IconDownload = (p: IconProps) => (
  <Base {...p}>
    <polyline points="12.75 10.25 10 13 7.25 10.25" {...stroke} data-color="color-2" />
    <line x1="10" y1="3" x2="10" y2="13" {...stroke} data-color="color-2" />
    <path
      d="m13.285,7c1.541,0,2.832,1.168,2.985,2.701l.4,4c.177,1.766-1.21,3.299-2.985,3.299h-7.37c-1.775,0-3.162-1.532-2.985-3.299l.4-4c.153-1.534,1.444-2.701,2.985-2.701"
      {...stroke}
    />
  </Base>
);

export const IconUsers = (p: IconProps) => (
  <Base {...p}>
    <circle cx="6.5" cy="8.5" r="2.5" {...stroke} />
    <circle cx="13.5" cy="5.5" r="2.5" {...stroke} data-color="color-2" />
    <path d="m10.875,11.845c.739-.532,1.645-.845,2.625-.845,1.959,0,3.626,1.252,4.244,3" {...stroke} data-color="color-2" />
    <path d="m2.256,17c.618-1.748,2.285-3,4.244-3s3.626,1.252,4.244,3" {...stroke} />
  </Base>
);

export const IconPalette = (p: IconProps) => (
  <Base {...p}>
    <line x1="3" y1="7.5" x2="17" y2="7.5" {...stroke} data-color="color-2" />
    <line x1="3" y1="12.5" x2="17" y2="12.5" {...stroke} data-color="color-2" />
    <rect x="3" y="3" width="14" height="14" rx="3" ry="3" {...stroke} />
  </Base>
);

export const IconCode = (p: IconProps) => (
  <Base {...p}>
    <polyline points="7 6 3 10 7 14" {...stroke} />
    <polyline points="13 14 17 10 13 6" {...stroke} data-color="color-2" />
  </Base>
);

export const IconPlug = (p: IconProps) => (
  <Base {...p} viewBox="0 0 20 20">
    <line x1="7" y1="6" x2="7" y2="3" {...stroke} data-color="color-2" />
    <line x1="13" y1="6" x2="13" y2="3" {...stroke} data-color="color-2" />
    <line x1="10" y1="17" x2="10" y2="15" {...stroke} data-color="color-2" />
    <path d="m5,6h10c.5519,0,1,.4481,1,1v2c0,3.3115-2.6885,6-6,6h0c-3.3115,0-6-2.6885-6-6v-2c0-.5519.4481-1,1-1Z" {...stroke} />
  </Base>
);

export const IconBranch = (p: IconProps) => (
  <Base {...p}>
    <line x1="6" y1="7" x2="6" y2="13" {...stroke} data-color="color-2" />
    <path d="m6,12h0c0-1.1046.8954-2,2-2h4c1.1046,0,2-.8954,2-2v-1" {...stroke} data-color="color-2" />
    <circle cx="6" cy="5" r="2" {...stroke} />
    <circle cx="14" cy="5" r="2" {...stroke} />
    <circle cx="6" cy="15" r="2" {...stroke} />
  </Base>
);

export const IconDevice = (p: IconProps) => (
  <Base {...p}>
    <rect x="8" y="3" width="4" height="1" {...stroke} data-color="color-2" />
    <rect x="4" y="3" width="12" height="14" rx="3" ry="3" {...stroke} />
  </Base>
);

export const IconCheck = (p: IconProps) => (
  <Base {...p}>
    <polyline points="4 10.5 8 14.5 16 5.5" {...stroke} strokeWidth={2.5} />
  </Base>
);

export const IconMinus = (p: IconProps) => (
  <Base {...p}>
    <line x1="4" y1="10" x2="16" y2="10" {...stroke} strokeWidth={2.5} />
  </Base>
);

export const IconXmark = (p: IconProps) => (
  <Base {...p}>
    <line x1="5" y1="5" x2="15" y2="15" {...stroke} />
    <line x1="15" y1="5" x2="5" y2="15" {...stroke} />
  </Base>
);

export const IconPlus = (p: IconProps) => (
  <Base {...p}>
    <line x1="10" y1="4" x2="10" y2="16" {...stroke} />
    <line x1="4" y1="10" x2="16" y2="10" {...stroke} data-color="color-2" />
  </Base>
);

export const IconInfo = (p: IconProps) => (
  <Base {...p}>
    <circle cx="10" cy="10" r="7.5" {...stroke} data-color="color-2" />
    <line x1="10" y1="9" x2="10" y2="14" {...stroke} />
    <circle cx="10" cy="6.25" r="1" fill="currentColor" />
  </Base>
);

export const IconWarning = (p: IconProps) => (
  <Base {...p}>
    <path d="m8.6,3.6L2.3,14.5c-.7,1.3.2,2.9,1.7,2.9h12c1.5,0,2.4-1.6,1.7-2.9L11.4,3.6c-.8-1.4-2.7-1.4-3.5,0Z" {...stroke} data-color="color-2" />
    <line x1="10" y1="7" x2="10" y2="11" {...stroke} />
    <circle cx="10" cy="13.75" r="1" fill="currentColor" />
  </Base>
);

export const IconCircleCheck = (p: IconProps) => (
  <Base {...p}>
    <circle cx="10" cy="10" r="7.5" {...stroke} data-color="color-2" />
    <polyline points="6.5 10.5 9 13 13.5 7.5" {...stroke} />
  </Base>
);

export const IconCircleX = (p: IconProps) => (
  <Base {...p}>
    <circle cx="10" cy="10" r="7.5" {...stroke} data-color="color-2" />
    <line x1="7.5" y1="7.5" x2="12.5" y2="12.5" {...stroke} />
    <line x1="12.5" y1="7.5" x2="7.5" y2="12.5" {...stroke} />
  </Base>
);

export const IconGithub = (p: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} {...p}>
    <path
      fill="currentColor"
      d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
    />
  </svg>
);

export const IconDiscord = (p: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} {...p}>
    <path
      fill="currentColor"
      d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.1.1 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.1 16.1 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02M8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12m6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12"
    />
  </svg>
);
