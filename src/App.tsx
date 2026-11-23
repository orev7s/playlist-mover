import { useEffect, useState } from "react";
import { PageShell } from "./components/PageShell";
import { useAccounts } from "./hooks/useAccounts";
import { ConnectScreen } from "./screens/ConnectScreen";
import { SelectScreen } from "./screens/SelectScreen";
import { SetupScreen } from "./screens/SetupScreen";
import { TransferScreen } from "./screens/TransferScreen";
import { completeLogin } from "./spotify/auth";
import { getClientId, setClientId } from "./spotify/token-store";
import type { TransferPlan } from "./transfer/run-transfer";
import { Reveal } from "./ui/components/reveal";
import { usePressEffect } from "./ui/lib/press";

// Started once at module load so React StrictMode's double effects cannot run it twice.
const login = completeLogin();

type Stage = { name: "connect" } | { name: "select" } | { name: "transfer"; plan: TransferPlan };

export function App() {
  usePressEffect();
  const [clientId, setClient] = useState(getClientId);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [stage, setStage] = useState<Stage>({ name: "connect" });
  const { profiles, pending, disconnect } = useAccounts(ready, setError);

  useEffect(() => {
    login.catch((e: Error) => setError(e.message)).finally(() => setReady(true));
  }, []);

  // Braces matter: newer browsers make scrollTo return a Promise, and React would call it as a cleanup.
  useEffect(() => {
    scrollTo({ top: 0, behavior: "smooth" });
  }, [stage.name]);

  const saveClientId = (id: string) => {
    setClientId(id);
    setClient(id);
  };

  const onChangeApp = clientId ? () => saveClientId("") : undefined;
  const screen = clientId ? stage.name : "setup";

  return (
    <PageShell error={error} onChangeApp={stage.name === "transfer" ? undefined : onChangeApp}>
      {/* Keyed by screen so every screen change replays the entrance animation. */}
      <Reveal key={screen} duration={450} blur={6} offset={0.6}>
        {screen === "setup" && <SetupScreen onSave={saveClientId} />}
        {screen === "connect" && (
          <ConnectScreen
            profiles={profiles}
            pending={pending}
            onDisconnect={disconnect}
            onContinue={() => setStage({ name: "select" })}
          />
        )}
        {screen === "select" && profiles.source && (
          <SelectScreen
            me={profiles.source}
            onBack={() => setStage({ name: "connect" })}
            onStart={(plan) => setStage({ name: "transfer", plan })}
          />
        )}
        {stage.name === "transfer" && screen === "transfer" && (
          <TransferScreen plan={stage.plan} onDone={() => setStage({ name: "connect" })} />
        )}
      </Reveal>
    </PageShell>
  );
}
