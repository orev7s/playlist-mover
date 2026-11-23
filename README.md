# Playlist Mover

Copy your Spotify playlists, liked songs and saved albums from one account to another.
Free, MIT licensed, no server. Everything runs in your browser and talks straight to
Spotify.

## What it moves

- Playlists you made: recreated on the new account with the same name, description,
  visibility and track order. Local files can't be added through Spotify's API, so they
  are skipped and counted in the log.
- Playlists made by other people: followed on the new account. Spotify only lets an app
  read the contents of playlists you own, so copying them isn't possible.
- Liked songs and saved albums: saved on the new account, oldest first so the order
  matches.

## Using it

You need your own Spotify developer app because there is no shared server holding a
secret. The site walks you through it, but in short:

1. Create an app at https://developer.spotify.com/dashboard and tick Web API.
2. Add the Redirect URI the site shows you.
3. Under User Management, add the email of every account you'll move between (max 5).
   The app owner needs Spotify Premium, that's Spotify's rule for developer apps.
4. Paste the Client ID into the site, connect both accounts and pick what to move.

When connecting the second account, click "Not you?" on Spotify's login page to switch
accounts.

The Client ID is kept in localStorage. Login tokens are kept in sessionStorage and are
gone when you close the tab.

## Hosting your own copy

```bash
npm install
npm run dev     # http://127.0.0.1:5173
npm run build   # static site in dist/
```

`dist/` is plain static files with relative paths, so it works on GitHub Pages, Netlify,
Cloudflare Pages or any web server. Spotify only accepts `https://` redirect URIs, or
`http://127.0.0.1` for local use (not `localhost`).

## Credits

UI components come from the unbound-ui kit (`src/ui`).
