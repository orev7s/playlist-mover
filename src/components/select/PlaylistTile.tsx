import type { Playlist } from "../../spotify/library";
import { cn } from "../../ui/lib/cn";
import { revealStyle } from "../reveal-style";
import { SelectMark } from "./SelectMark";

interface PlaylistTileProps {
  playlist: Playlist;
  index: number;
  selected: boolean;
  onToggle: () => void;
}

export function PlaylistTile({ playlist: p, index, selected, onToggle }: PlaylistTileProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      style={revealStyle(index)}
      className={cn(
        "press-flat flex min-w-0 animate-reveal flex-col gap-2 rounded-surface border bg-card p-2 text-left transition-colors duration-200",
        selected ? "border-primary/60 bg-primary/8" : "hover:bg-accent/40",
      )}
    >
      <span className="relative aspect-square overflow-hidden rounded-control bg-muted">
        {p.image ? (
          <img
            src={p.image}
            alt=""
            loading="lazy"
            className={cn("size-full object-cover transition-[opacity,scale] duration-300", !selected && "scale-95 opacity-60")}
          />
        ) : (
          <span className="flex size-full items-center justify-center text-3xl font-bold text-muted-foreground">
            {p.name.charAt(0).toUpperCase()}
          </span>
        )}
        <SelectMark selected={selected} className="absolute top-2 right-2" />
      </span>
      <span className="min-w-0 px-1 pb-1">
        <span className="block truncate text-sm font-medium">{p.name}</span>
        <span className="block truncate text-xs text-muted-foreground">
          {p.ownedByMe ? `${p.total} tracks` : "Not yours, will be followed"}
        </span>
      </span>
    </button>
  );
}
