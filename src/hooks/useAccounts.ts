import { useEffect, useState } from "react";
import { returningSlot } from "../spotify/auth";
import { getProfile, type Profile } from "../spotify/library";
import { clearTokens, hasTokens, SLOTS, type Slot } from "../spotify/token-store";

export type Profiles = Partial<Record<Slot, Profile>>;

/** Loads the Spotify profile for each connected slot once login handling has finished. */
export function useAccounts(ready: boolean, onError: (message: string) => void) {
  const [profiles, setProfiles] = useState<Profiles>({});
  // Slots that will have a profile soon: saved tokens, or a login Spotify is redirecting back from.
  const [pending, setPending] = useState(() => new Set(SLOTS.filter((s) => hasTokens(s) || s === returningSlot)));

  useEffect(() => {
    if (!ready) return;
    const settle = (slot: Slot) =>
      setPending((set) => {
        const next = new Set(set);
        next.delete(slot);
        return next;
      });
    for (const slot of SLOTS) {
      if (!hasTokens(slot)) {
        settle(slot);
        continue;
      }
      getProfile(slot)
        .then((p) => setProfiles((all) => ({ ...all, [slot]: p })))
        .catch((e: Error) => {
          clearTokens(slot);
          onError(e.message);
        })
        .finally(() => settle(slot));
    }
  }, [ready, onError]);

  const disconnect = (slot: Slot) => {
    clearTokens(slot);
    setProfiles(({ [slot]: _, ...rest }) => rest);
  };

  return { profiles, pending, disconnect };
}
