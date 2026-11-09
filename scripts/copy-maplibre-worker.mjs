// Turbopack doesn't resolve maplibre-gl's bundler-relative worker URL, so we
// serve its worker bundle as a static file instead (see MapView.tsx).
import { copyFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(root, "..", "node_modules", "maplibre-gl", "dist", "maplibre-gl-worker.mjs");
const destDir = path.join(root, "..", "public", "maplibre");
const dest = path.join(destDir, "maplibre-gl-worker.mjs");

mkdirSync(destDir, { recursive: true });
copyFileSync(src, dest);
console.log("copied maplibre-gl worker bundle to public/maplibre/maplibre-gl-worker.mjs");
