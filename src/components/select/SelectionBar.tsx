import { Button } from "../../ui/components/button";
import { IconArrowRight, IconChevronLeft } from "../../ui/components/icons-extra";

interface SelectionBarProps {
  summary: string;
  canStart: boolean;
  onBack: () => void;
  onStart: () => void;
}

/** Stays pinned to the bottom of the screen while the playlist grid scrolls. */
export function SelectionBar({ summary, canStart, onBack, onStart }: SelectionBarProps) {
  return (
    <div className="sticky bottom-4 z-10 flex items-center gap-3 rounded-surface border bg-popover/90 p-2 pl-3 shadow-surface backdrop-blur">
      <Button variant="ghost" size="icon" aria-label="Back" onClick={onBack}>
        <IconChevronLeft />
      </Button>
      <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">{summary}</span>
      <Button disabled={!canStart} onClick={onStart}>
        Start moving <IconArrowRight />
      </Button>
    </div>
  );
}
