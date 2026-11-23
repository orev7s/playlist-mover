import { useCallback, useEffect, useRef, useState } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "../lib/cn";
import { Button } from "./button";
import { IconCheck } from "./icons";
import { IconCopy } from "./icons-extra";

/** Clipboard write that falls back to a hidden textarea when the async API is unavailable. */
async function writeText(text: string) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Blocked or insecure context; try the legacy path below.
  }
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

interface CopyToClipboard {
  copied: boolean;
  copy: (text: string) => Promise<boolean>;
}

export function useCopyToClipboard(resetMs = 1500): CopyToClipboard {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const copy = useCallback(
    async (text: string) => {
      const ok = await writeText(text);
      if (!ok) return false;
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), resetMs);
      return true;
    },
    [resetMs],
  );

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return { copied, copy };
}

interface CopyButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  value: string;
  className?: string;
}

/** Icon-only button that copies the given value and briefly shows a check. */
export function CopyButton({ value, className, ...props }: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard();
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      data-slot="copy-button"
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      className={cn("text-muted-foreground hover:text-foreground", className)}
      onClick={() => void copy(value)}
      {...props}
    >
      {copied ? <IconCheck /> : <IconCopy />}
    </Button>
  );
}
