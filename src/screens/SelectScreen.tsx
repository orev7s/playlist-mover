import { useEffect, useState } from "react";
import { LIBRARY_ART } from "../components/library-art";
import { LibraryTile } from "../components/select/LibraryTile";
import { PlaylistTile } from "../components/select/PlaylistTile";
import { SelectionBar } from "../components/select/SelectionBar";
import { countItems, getPlaylists, type Playlist, type Profile } from "../spotify/library";
import type { TransferPlan } from "../transfer/run-transfer";
import { Alert, AlertDescription } from "../ui/components/alert";
import { Button } from "../ui/components/button";
import { IconWarning } from "../ui/components/icons";
import { Input } from "../ui/components/input";
import { SelectSkeleton } from "../components/select/SelectSkeleton";
import { Text } from "../ui/components/text";

interface SelectScreenProps {
  me: Profile;
  onBack: () => void;
  onStart: (plan: TransferPlan) => void;
}

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

export function SelectScreen({ me, onBack, onStart }: SelectScreenProps) {
  const [playlists, setPlaylists] = useState<Playlist[] | null>(null);
  const [counts, setCounts] = useState({ liked: 0, albums: 0 });
  const [error, setError] = useState("");
  const [liked, setLiked] = useState(true);
  const [albums, setAlbums] = useState(true);
  const [picked, setPicked] = useState(new Set<string>());
  const [query, setQuery] = useState("");

  useEffect(() => {
    Promise.all([getPlaylists("source", me.id), countItems("source", "/me/tracks"), countItems("source", "/me/albums")])
      .then(([list, likedCount, albumCount]) => {
        setPlaylists(list);
        setCounts({ liked: likedCount, albums: albumCount });
        setPicked(new Set(list.map((p) => p.id)));
      })
      .catch((e: Error) => setError(e.message));
  }, [me.id]);

  if (error) {
    return (
      <Alert variant="destructive">
        <IconWarning />
        <AlertDescription>Could not load your library: {error}</AlertDescription>
      </Alert>
    );
  }

  if (!playlists) return <SelectSkeleton />;

  const visible = playlists.filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()));
  const allVisiblePicked = visible.length > 0 && visible.every((p) => picked.has(p.id));

  const setMany = (ids: string[], on: boolean) =>
    setPicked((set) => {
      const next = new Set(set);
      for (const id of ids) on ? next.add(id) : next.delete(id);
      return next;
    });

  const parts = [
    picked.size > 0 && plural(picked.size, "playlist"),
    liked && "liked songs",
    albums && "saved albums",
  ].filter(Boolean);

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-3">
        <Text variant="heading-sm">Your library</Text>
        <div className="grid gap-3 sm:grid-cols-2">
          <LibraryTile
            title="Liked songs"
            detail={plural(counts.liked, "song")}
            artClass={LIBRARY_ART.liked}
            selected={liked}
            onToggle={() => setLiked(!liked)}
          />
          <LibraryTile
            title="Saved albums"
            detail={plural(counts.albums, "album")}
            artClass={LIBRARY_ART.albums}
            selected={albums}
            onToggle={() => setAlbums(!albums)}
          />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Text variant="heading-sm" className="flex-1">
            Playlists <span className="text-muted-foreground">({playlists.length})</span>
          </Text>
          <Input
            placeholder="Search playlists"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-9 w-full sm:w-48"
          />
          <Button variant="secondary" size="sm" onClick={() => setMany(visible.map((p) => p.id), !allVisiblePicked)}>
            {allVisiblePicked ? "Clear" : "Select all"}
          </Button>
        </div>
        {visible.length ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {visible.map((p, i) => (
              <PlaylistTile
                key={p.id}
                index={i}
                playlist={p}
                selected={picked.has(p.id)}
                onToggle={() => setMany([p.id], !picked.has(p.id))}
              />
            ))}
          </div>
        ) : (
          <Text color="muted" variant="text-sm" className="animate-reveal py-8 text-center">
            {playlists.length ? "No playlists match that search." : "This account has no playlists."}
          </Text>
        )}
      </section>

      <SelectionBar
        summary={parts.length ? parts.join(", ") : "Nothing selected"}
        canStart={parts.length > 0}
        onBack={onBack}
        onStart={() => onStart({ liked, albums, playlists: playlists.filter((p) => picked.has(p.id)) })}
      />
    </div>
  );
}
