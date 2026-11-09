"use client";

import { useSyncExternalStore } from "react";
import { MAP_STYLES, getStoredMapStyleId, setStoredMapStyleId, type MapStyleId } from "@/lib/mapStyle";

const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

function notify() {
  listeners.forEach((l) => l());
}

function getServerSnapshot(): MapStyleId {
  return "positron";
}

export function MapStyleSelect() {
  const value = useSyncExternalStore(subscribe, getStoredMapStyleId, getServerSnapshot);

  return (
    <select
      id="tile"
      value={value}
      onChange={(e) => {
        setStoredMapStyleId(e.target.value as MapStyleId);
        notify();
      }}
      className="h-11 rounded-[10px] border border-[#CBD5D1] bg-white px-3 text-sm"
    >
      {MAP_STYLES.map((s) => (
        <option key={s.id} value={s.id}>
          {s.label}
        </option>
      ))}
    </select>
  );
}
