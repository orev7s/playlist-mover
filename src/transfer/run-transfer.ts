import { LIBRARY_ART } from "../components/library-art";
import {
  addToPlaylist,
  createPlaylist,
  getLikedUris,
  getPlaylistUris,
  getSavedAlbumUris,
  saveToLibrary,
  type Playlist,
} from "../spotify/library";

export interface TransferPlan {
  liked: boolean;
  albums: boolean;
  playlists: Playlist[];
}

export type ItemState = "waiting" | "running" | "done" | "warn" | "failed";

export interface ItemStatus {
  state: ItemState;
  text: string;
}

type Report = (text: string) => void;
type Outcome = { text: string; warn?: boolean };

export interface TransferItem {
  id: string;
  title: string;
  image?: string;
  artClass?: string;
  run: (report: Report) => Promise<Outcome>;
}

function libraryItem(id: "liked" | "albums", title: string, noun: string, load: () => Promise<string[]>): TransferItem {
  return {
    id,
    title,
    artClass: LIBRARY_ART[id],
    run: async (report) => {
      report("Reading library");
      // The API lists newest first. Saving oldest first keeps the original order in the new library.
      const uris = (await load()).reverse();
      let saved = 0;
      await saveToLibrary("target", uris, (n) => report(`${(saved += n)} / ${uris.length} ${noun}`));
      return { text: `${uris.length} ${noun} saved` };
    },
  };
}

function playlistItem(p: Playlist): TransferItem {
  const base = { id: p.id, title: p.name, image: p.image };
  // Spotify only exposes the contents of playlists you own, so other people's playlists are followed instead.
  if (!p.ownedByMe) {
    return { ...base, run: async () => (await saveToLibrary("target", [p.uri]), { text: "Followed, made by someone else" }) };
  }

  // Kept across retries so a retry continues the same playlist instead of creating a duplicate.
  let targetId: string | undefined;
  let added = 0;
  return {
    ...base,
    run: async (report) => {
      report("Reading tracks");
      const { uris, skipped } = await getPlaylistUris("source", p.id);
      targetId ??= await createPlaylist("target", p);
      await addToPlaylist("target", targetId, uris.slice(added), (n) => report(`${(added += n)} / ${uris.length} tracks`));
      return skipped
        ? { warn: true, text: `${uris.length} tracks copied, ${skipped} local or unavailable skipped` }
        : { text: `${uris.length} tracks copied` };
    },
  };
}

export function buildItems(plan: TransferPlan): TransferItem[] {
  return [
    ...(plan.liked ? [libraryItem("liked", "Liked songs", "songs", () => getLikedUris("source"))] : []),
    ...(plan.albums ? [libraryItem("albums", "Saved albums", "albums", () => getSavedAlbumUris("source"))] : []),
    ...plan.playlists.map(playlistItem),
  ];
}

/** Runs items one by one. A failed item is marked and the rest still run. */
export async function runItems(items: TransferItem[], update: (id: string, status: ItemStatus) => void) {
  for (const item of items) {
    update(item.id, { state: "running", text: "Starting" });
    try {
      const outcome = await item.run((text) => update(item.id, { state: "running", text }));
      update(item.id, { state: outcome.warn ? "warn" : "done", text: outcome.text });
    } catch (e) {
      update(item.id, { state: "failed", text: e instanceof Error ? e.message : String(e) });
    }
  }
}
