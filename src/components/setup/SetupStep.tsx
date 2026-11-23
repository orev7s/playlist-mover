import { redirectUri } from "../../spotify/auth";
import { ButtonLink } from "../../ui/components/button";
import { CopyButton } from "../../ui/components/copy-button";
import { IconCircleCheck, IconPlug, IconUsers } from "../../ui/components/icons";
import { IconArrowUpRight, IconLink, IconLock } from "../../ui/components/icons-extra";
import { Input } from "../../ui/components/input";
import { StepHero, StepHint } from "./StepHero";

export const SETUP_STEPS = 4;
export const isClientId = (value: string) => /^[0-9a-f]{32}$/i.test(value.trim());

interface SetupStepProps {
  step: number;
  clientId: string;
  onClientId: (value: string) => void;
  onSubmit: () => void;
}

export function SetupStep({ step, clientId, onClientId, onSubmit }: SetupStepProps) {
  if (step === 0) {
    return (
      <>
        <StepHero icon={IconPlug} title="Create your own Spotify app">
          This site has no server, so Spotify needs an app that belongs to you. It's free and you only do it once.
        </StepHero>
        <ButtonLink size="lg" href="https://developer.spotify.com/dashboard" target="_blank" rel="noopener">
          Open Spotify dashboard <IconArrowUpRight />
        </ButtonLink>
        <StepHint>Log in, click Create app, use any name and description, and tick Web API.</StepHint>
      </>
    );
  }

  if (step === 1) {
    return (
      <>
        <StepHero icon={IconLink} title="Add this redirect address">
          Spotify sends you back here after you log in. Paste it into Redirect URIs in the same form, click Add, then
          Save.
        </StepHero>
        <div className="flex w-full max-w-md items-center gap-2 rounded-control border bg-muted/60 py-2 pr-2 pl-4">
          <span className="min-w-0 flex-1 truncate font-mono text-sm">{redirectUri()}</span>
          <CopyButton value={redirectUri()} />
        </div>
      </>
    );
  }

  if (step === 2) {
    return (
      <>
        <StepHero icon={IconUsers} title="Let both accounts in">
          New Spotify apps only work for people you list. In your app, open Settings, then User Management, and add the
          name and email of both accounts.
        </StepHero>
        <StepHint>The account that owns the app needs Premium. That's Spotify's rule, and it allows up to 5 accounts.</StepHint>
      </>
    );
  }

  return (
    <>
      <StepHero icon={IconLock} title="Paste your Client ID">
        You'll find it at the top of your app's Settings page. It's 32 letters and numbers.
      </StepHero>
      <form
        className="relative w-full max-w-md"
        onSubmit={(e) => {
          e.preventDefault();
          if (isClientId(clientId)) onSubmit();
        }}
      >
        <Input
          autoFocus
          aria-label="Client ID"
          placeholder="e.g. 1a2b3c4d5e6f..."
          value={clientId}
          onChange={(e) => onClientId(e.target.value)}
          autoComplete="off"
          spellCheck={false}
          className="pr-11 text-center font-mono"
        />
        {isClientId(clientId) && (
          <IconCircleCheck className="absolute top-1/2 right-4 size-5 -translate-y-1/2 animate-in text-emerald-500 zoom-in-50" />
        )}
      </form>
      <StepHint>It stays in this browser and is only ever sent to Spotify.</StepHint>
    </>
  );
}
