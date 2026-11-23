import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Relative base so the build works from any folder or GitHub Pages subpath.
// Spotify rejects "localhost" redirect URIs, so dev runs on 127.0.0.1.
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  server: { host: "127.0.0.1", port: 5173 },
});
