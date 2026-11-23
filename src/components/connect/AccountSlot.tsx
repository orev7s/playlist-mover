import { useState } from "react";
import { beginLogin } from "../../spotify/auth";
import type { Profile } from "../../spotify/library";
import type { Slot } from "../../spotify/token-store";
import { Button } from "../../ui/components/button";
import { IconLogin, IconUser } from "../../ui/components/icons";
import { Skeleton } from "../../ui/components/skeleton";
import { Spinner } from "../../ui/components/spinner";
import { cn } from "../../ui/lib/cn";

interface AccountSlotProps {
  slot: Slot;
  label: string;
  profile?: Profile;
  loading: boolean;
  onDisconnect: (slot: Slot) => void;
}

function Avatar({ profile }: { profile?: Profile }) {
  const image = profile?.images?.[0]?.url;
  const name = profile?.display_name ?? profile?.id ?? "";
  if (!profile) {
    return (
      <span className="flex size-20 items-center justify-center rounded-full border-2 border-dashed border-foreground/20 text-muted-foreground">
        <IconUser className="size-8" />
      </span>
    );
  }
  return (
    <span className="flex size-20 animate-in items-center justify-center overflow-hidden rounded-full bg-primary/15 text-3xl font-bold text-primary ring-2 ring-primary/40 zoom-in-75 duration-300">
      {image ? <img src={image} alt="" className="size-full object-cover" /> : name.charAt(0).toUpperCase()}
    </span>
  );
}

export function AccountSlot({ slot, label, profile, loading, onDisconnect }: AccountSlotProps) {
  const [leaving, setLeaving] = useState(false);

  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 flex-col items-center gap-3 rounded-surface border bg-card p-6 text-center shadow-surface transition-colors duration-300",
        profile && "border-primary/40",
      )}
    >
      <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">{label}</span>
      {loading ? (
        <>
          <Skeleton className="size-20 rounded-full" />
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-8 w-32" />
        </>
      ) : (
        <>
          <Avatar profile={profile} />
          <span className={cn("w-full truncate font-semibold", !profile && "text-muted-foreground")}>
            {profile ? (profile.display_name ?? profile.id) : "Not connected"}
          </span>
          {profile ? (
            <Button variant="ghost" size="sm" onClick={() => onDisconnect(slot)}>
              Disconnect
            </Button>
          ) : (
            <Button
              size="sm"
              disabled={leaving}
              onClick={() => {
                setLeaving(true);
                void beginLogin(slot);
              }}
            >
              {leaving ? <Spinner /> : <IconLogin />} {leaving ? "Opening Spotify" : "Connect Spotify"}
            </Button>
          )}
        </>
      )}
    </div>
  );
}
