import { Skeleton } from "../../ui/components/skeleton";

/** Placeholder with the same shape as the select screen while the library loads. */
export function SelectSkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-busy aria-label="Loading your library">
      <section className="flex flex-col gap-3">
        <Skeleton className="h-6 w-32" />
        <div className="grid gap-3 sm:grid-cols-2">
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center gap-4 rounded-surface border bg-card p-3">
              <Skeleton className="size-16 shrink-0" />
              <div className="flex flex-1 flex-col gap-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-3">
        <Skeleton className="h-6 w-40" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="flex flex-col gap-2 rounded-surface border bg-card p-2" style={{ animationDelay: `${i * 80}ms` }}>
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
