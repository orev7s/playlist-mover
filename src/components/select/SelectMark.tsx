import { IconCheck } from "../../ui/components/icons";
import { cn } from "../../ui/lib/cn";

/** Round selection indicator shared by the library and playlist tiles. */
export function SelectMark({ selected, className }: { selected: boolean; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200",
        selected ? "scale-100 border-primary bg-primary text-primary-foreground" : "scale-90 border-foreground/30 bg-background/60",
        className,
      )}
    >
      {selected && <IconCheck className="size-3.5 animate-in zoom-in-50 duration-200" />}
    </span>
  );
}
