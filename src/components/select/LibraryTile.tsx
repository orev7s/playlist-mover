import { cn } from "../../ui/lib/cn";
import { SelectMark } from "./SelectMark";

interface LibraryTileProps {
  title: string;
  detail: string;
  artClass: string;
  selected: boolean;
  onToggle: () => void;
}

export function LibraryTile({ title, detail, artClass, selected, onToggle }: LibraryTileProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      className={cn(
        "press-flat flex animate-reveal items-center gap-4 rounded-surface border bg-card p-3 text-left transition-colors duration-200",
        selected ? "border-primary/60 bg-primary/8" : "hover:bg-accent/40",
      )}
    >
      <span className={cn("size-16 shrink-0 rounded-control shadow-surface", artClass)} />
      <span className="min-w-0 flex-1">
        <span className="block truncate font-semibold">{title}</span>
        <span className="block text-sm text-muted-foreground">{detail}</span>
      </span>
      <SelectMark selected={selected} />
    </button>
  );
}
