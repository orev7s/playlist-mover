import { useEffect, useRef } from "react";
import type { ItemStatus, TransferItem } from "../../transfer/run-transfer";
import { IconCircleCheck, IconCircleX, IconWarning } from "../../ui/components/icons";
import { Spinner } from "../../ui/components/spinner";
import { cn } from "../../ui/lib/cn";
import { revealStyle } from "../reveal-style";

const ICON = { done: IconCircleCheck, warn: IconWarning, failed: IconCircleX };
const TONE = {
  waiting: "text-muted-foreground",
  running: "text-foreground",
  done: "text-emerald-500",
  warn: "text-amber-500",
  failed: "text-destructive",
};

export function TransferRow({ item, status, index }: { item: TransferItem; status: ItemStatus; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const { state, text } = status;
  const Icon = state in ICON ? ICON[state as keyof typeof ICON] : null;

  useEffect(() => {
    if (state === "running") ref.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [state]);

  return (
    <li
      ref={ref}
      style={revealStyle(index)}
      className={cn(
        "flex animate-reveal items-center gap-3 rounded-surface border bg-card p-2 pr-3 transition-[background-color,border-color,opacity] duration-300",
        state === "running" && "border-primary/60 bg-primary/8",
        state === "waiting" && "opacity-60",
      )}
    >
      <span className={cn("size-12 shrink-0 overflow-hidden rounded-control bg-muted", item.artClass)}>
        {item.image ? (
          <img src={item.image} alt="" loading="lazy" className="size-full object-cover" />
        ) : (
          !item.artClass && (
            <span className="flex size-full items-center justify-center text-lg font-bold text-muted-foreground">
              {item.title.charAt(0).toUpperCase()}
            </span>
          )
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium">{item.title}</span>
        <span title={text} className={cn("line-clamp-2 text-xs break-words", TONE[state])}>
          {text}
        </span>
      </span>
      {state === "running" ? (
        <Spinner size={20} className="animate-in fade-in" />
      ) : (
        Icon && <Icon key={state} className={cn("size-5 shrink-0 animate-in zoom-in-50 duration-300", TONE[state])} />
      )}
    </li>
  );
}
