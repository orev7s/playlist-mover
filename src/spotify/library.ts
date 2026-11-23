import { chunk, fetchAll, spotify } from "./api";
import type { Slot } from "./token-store";

export interface Profile {
  id: string;
  display_name: string | null;
  images?: { url: string }[];
}

export interface Playlist {
  id: string;
  uri: string;
  name: string;
  description: string;
  isPublic: boolean;
  ownedByMe: boolean;
  total: number;
  image?: string;
}

interface RawPlaylist {
  id: string;
  uri: string;
  name: string;
  description: string | null;
  public: boolean | null;
  images?: { url: string }[] | null;
  owner: { id: string };
  items?: { total: number };
  tracks?: { total: number };
}

interface RawItem {
  uri: string;
  is_local?: boolean;
}

export const getProfile = (slot: Slot) => spotify<Profile>(slot, "/me");

export const countItems = async (slot: Slot, path: string) =>
  (await spotify<{ total: number }>(slot, `${path}?limit=1`)).total;

// Spotify returns descriptions HTML-escaped; decode so they are not escaped twice on the copy.
const decodeHtml = (text: string) => new DOMParser().parseFromString(text, "text/html").documentElement.textContent ?? "";

export async function getPlaylists(slot: Slot, myId: string): Promise<Playlist[]> {
  const raw = await fetchAll<RawPlaylist | null>(slot, "/me/playlists?limit=50");
  return raw.filter((p): p is RawPlaylist => p !== null).map((p) => ({
    id: p.id,
    uri: p.uri,
    name: p.name,
    description: decodeHtml(p.description ?? ""),
    isPublic: p.public ?? false,
    ownedByMe: p.owner.id === myId,
    // Spotify renamed playlist "tracks" to "items" in 2026; accept both.
    total: p.items?.total ?? p.tracks?.total ?? 0,
    // Images are listed largest first; the smallest is plenty for a tile.
    image: p.images?.at(-1)?.url,
  }));
}

/** Track and episode URIs in playlist order. Local files cannot be added by the API, so they are counted and skipped. */
export async function getPlaylistUris(slot: Slot, id: string) {
  const entries = await fetchAll<{ item?: RawItem | null; track?: RawItem | null }>(slot, `/playlists/${id}/items?limit=100`);
  const items = entries.map((e) => e.item ?? e.track);
  const uris = items.filter((t): t is RawItem => !!t?.uri && !t.is_local).map((t) => t.uri);
  return { uris, skipped: entries.length - uris.length };
}

export const getLikedUris = async (slot: Slot) =>
  (await fetchAll<{ track: RawItem }>(slot, "/me/tracks?limit=50")).map((e) => e.track.uri);

export const getSavedAlbumUris = async (slot: Slot) =>
  (await fetchAll<{ album: RawItem }>(slot, "/me/albums?limit=50")).map((e) => e.album.uri);

export async function createPlaylist(slot: Slot, from: Playlist) {
  const created = await spotify<{ id: string }>(slot, "/me/playlists", "POST", {
    name: from.name,
    description: from.description,
    public: from.isPublic,
  });
  return created.id;
}

type OnBatch = (count: number) => void;

export async function addToPlaylist(slot: Slot, id: string, uris: string[], onBatch?: OnBatch) {
  for (const batch of chunk(uris, 100)) {
    await spotify(slot, `/playlists/${id}/items`, "POST", { uris: batch });
    onBatch?.(batch.length);
  }
}

/** Saves tracks, albums or playlists (follow) by URI. Batches run in order so older items get older save dates. */
export async function saveToLibrary(slot: Slot, uris: string[], onBatch?: OnBatch) {
  for (const batch of chunk(uris, 40)) {
    await spotify(slot, `/me/library?${new URLSearchParams({ uris: batch.join(",") })}`, "PUT");
    onBatch?.(batch.length);
  }
}
