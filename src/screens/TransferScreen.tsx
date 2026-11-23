import { useEffect, useRef, useState } from "react";
import { TransferRow } from "../components/transfer/TransferRow";
import {
  buildItems,
  runItems,
  type ItemState,
  type ItemStatus,
  type TransferItem,
  type TransferPlan,
} from "../transfer/run-transfer";
import { Button } from "../ui/components/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/components/card";
import { IconRefresh } from "../ui/components/icons-extra";
import { Progress } from "../ui/components/progress";

const WAITING: ItemStatus = { state: "waiting", text: "Waiting" };

export function TransferScreen({ plan, onDone }: { plan: TransferPlan; onDone: () => void }) {
  const [items] = useState(() => buildItems(plan));
  const [statuses, setStatuses] = useState<Record<string, ItemStatus>>(() =>
    Object.fromEntries(items.map((i) => [i.id, WAITING])),
  );
  const [running, setRunning] = useState(true);
  const started = useRef(false);

  const run = (list: TransferItem[]) => {
    setRunning(true);
    setStatuses((all) => ({ ...all, ...Object.fromEntries(list.map((i) => [i.id, WAITING])) }));
    runItems(list, (id, status) => setStatuses((all) => ({ ...all, [id]: status }))).then(() => setRunning(false));
  };

  useEffect(() => {
    // Guard against StrictMode running the effect twice, which would copy everything twice.
    if (started.current) return;
    started.current = true;
    run(items);
  }, [items]);

  useEffect(() => {
    if (!running) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    addEventListener("beforeunload", warn);
    return () => removeEventListener("beforeunload", warn);
  }, [running]);

  const withState = (...states: ItemState[]) => items.filter((i) => states.includes(statuses[i.id].state));
  const finished = withState("done", "warn", "failed").length;
  const failed = withState("failed");
  const skipped = withState("warn").length;
  const current = withState("running")[0];

  const summary = [
    `${withState("done", "warn").length} of ${items.length} moved`,
    skipped && `${skipped} with skipped tracks`,
    failed.length && `${failed.length} failed`,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>{running ? "Moving your music" : failed.length ? "Finished with problems" : "All done"}</CardTitle>
          <CardDescription>
            {running
              ? `${finished} of ${items.length} done${current ? `, now on ${current.title}` : ""}. Keep this tab open.`
              : `${summary}. It can take a minute to show up in Spotify.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={(finished / Math.max(items.length, 1)) * 100} />
        </CardContent>
        {!running && (
          <CardFooter className="animate-reveal justify-end gap-2">
            <Button variant={failed.length ? "outline" : "default"} onClick={onDone}>
              Start over
            </Button>
            {failed.length > 0 && (
              <Button onClick={() => run(failed)}>
                <IconRefresh /> Retry {failed.length} failed
              </Button>
            )}
          </CardFooter>
        )}
      </Card>

      <ul className="flex flex-col gap-2">
        {items.map((item, i) => (
          <TransferRow key={item.id} index={i} item={item} status={statuses[item.id]} />
        ))}
      </ul>
    </div>
  );
}
