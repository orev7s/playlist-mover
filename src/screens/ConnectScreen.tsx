import { AccountSlot } from "../components/connect/AccountSlot";
import { FlowArrow } from "../components/connect/FlowArrow";
import type { Profiles } from "../hooks/useAccounts";
import type { Slot } from "../spotify/token-store";
import { Button } from "../ui/components/button";
import { IconArrowRight } from "../ui/components/icons-extra";
import { Text } from "../ui/components/text";

interface ConnectScreenProps {
  profiles: Profiles;
  pending: Set<Slot>;
  onDisconnect: (slot: Slot) => void;
  onContinue: () => void;
}

function headline({ source, target }: Profiles, loading: boolean, sameAccount: boolean) {
  if (loading) return ["Checking your accounts", "This only takes a second."];
  if (sameAccount)
    return ["That's the same account twice", "Disconnect the right side, connect again and click Not you? on Spotify's page."];
  if (!source) return ["Where is your music now?", "Connect the Spotify account you're moving from."];
  if (!target)
    return ["Where should it go?", "Connect the account you're moving to. On Spotify's page, click Not you? to switch accounts."];
  return ["Ready to move", "Next you pick exactly what comes along."];
}

export function ConnectScreen({ profiles, pending, onDisconnect, onContinue }: ConnectScreenProps) {
  const { source, target } = profiles;
  const loading = pending.size > 0;
  const sameAccount = !!source && source.id === target?.id;
  const ready = !loading && !!source && !!target && !sameAccount;
  const [title, detail] = headline(profiles, loading, sameAccount);

  return (
    <div className="flex flex-col gap-10">
      {/* Keyed by title so the text animates whenever the situation changes. */}
      <div key={title} className="flex animate-reveal flex-col items-center gap-2 text-center">
        <Text variant="heading-lg">{title}</Text>
        <Text color="muted" className="max-w-md">
          {detail}
        </Text>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <AccountSlot slot="source" label="Move from" profile={source} loading={pending.has("source")} onDisconnect={onDisconnect} />
        <FlowArrow active={ready} />
        <AccountSlot slot="target" label="Move to" profile={target} loading={pending.has("target")} onDisconnect={onDisconnect} />
      </div>

      <Button size="lg" className="min-w-60 self-center" disabled={!ready} onClick={onContinue}>
        Choose what to move <IconArrowRight />
      </Button>
    </div>
  );
}
