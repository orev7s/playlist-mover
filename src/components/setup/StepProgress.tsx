import { cn } from "../../ui/lib/cn";

export function StepProgress({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium text-muted-foreground">
        One-time setup · Step {step + 1} of {total}
      </span>
      <div className="flex gap-1.5">
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
            <span
              className={cn(
                "block h-full rounded-full bg-primary transition-[width] duration-500 ease-out",
                i <= step ? "w-full" : "w-0",
              )}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
