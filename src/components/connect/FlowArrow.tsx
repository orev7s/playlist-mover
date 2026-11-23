import { IconArrowRight } from "../../ui/components/icons-extra";
import { cn } from "../../ui/lib/cn";

/** The arrow between the two accounts. Points down on phones, where the cards stack. */
export function FlowArrow({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-11 shrink-0 items-center justify-center self-center rounded-full border transition-colors duration-500",
        active ? "border-primary bg-primary text-primary-foreground" : "bg-card text-muted-foreground",
      )}
    >
      <IconArrowRight className={cn("size-5 rotate-90 sm:rotate-0", active && "animate-pulse")} />
    </span>
  );
}
