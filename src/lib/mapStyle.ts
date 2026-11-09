export type MapStyleId = "positron" | "liberty" | "bright" | "dark";

export const MAP_STYLES: { id: MapStyleId; label: string; url: string }[] = [
  { id: "positron", label: "Positron (สว่าง เรียบ)", url: "https://tiles.openfreemap.org/styles/positron" },
  { id: "liberty", label: "Liberty", url: "https://tiles.openfreemap.org/styles/liberty" },
  { id: "bright", label: "Bright", url: "https://tiles.openfreemap.org/styles/bright" },
  { id: "dark", label: "Dark", url: "https://tiles.openfreemap.org/styles/dark" },
];

const STORAGE_KEY = "waypoint:map-style";
const DEFAULT_STYLE: MapStyleId = "positron";

export function getStoredMapStyleId(): MapStyleId {
  if (typeof window === "undefined") return DEFAULT_STYLE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return MAP_STYLES.find((s) => s.id === raw)?.id ?? DEFAULT_STYLE;
  } catch {
    return DEFAULT_STYLE;
  }
}

export function setStoredMapStyleId(id: MapStyleId) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, id);
  } catch {
    // ignore — e.g. storage blocked in a private window
  }
}
