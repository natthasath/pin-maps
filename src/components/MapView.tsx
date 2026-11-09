"use client";

import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { STATUS } from "@/lib/places";
import { getStoredMapStyleId, setStoredMapStyleId, MAP_STYLES } from "@/lib/mapStyle";
import type { Place } from "@/lib/types";

export type MapControls = {
  zoomIn: () => void;
  zoomOut: () => void;
  locate: () => void;
  cycleStyle: () => void;
};

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function markerInnerHtml(name: string, size: number, dot: string, showLabel: boolean) {
  const label = showLabel
    ? `<span style="margin-bottom:6px;padding:6px 10px;border-radius:8px;background:#0F1F1C;color:#fff;font-size:13px;font-weight:600;white-space:nowrap;box-shadow:0 6px 18px rgba(15,31,28,0.25)">${escapeHtml(name)}</span>`
    : "";
  return `${label}<svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s-7.5-6.6-7.5-12.2a7.5 7.5 0 0 1 15 0C19.5 15.4 12 22 12 22z" fill="${dot}" stroke="#FFFFFF" stroke-width="1.6"></path><circle cx="12" cy="9.8" r="2.8" fill="#FFFFFF"></circle></svg>`;
}

export function MapView({
  places,
  selectedId,
  onSelect,
  onReady,
  className,
}: {
  places: Place[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onReady?: (controls: MapControls) => void;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<Record<string, maplibregl.Marker>>({});
  const styleIndexRef = useRef(0);
  const onSelectRef = useRef(onSelect);
  const placesAtMountRef = useRef(places);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    placesAtMountRef.current = places;
  }, [places]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Turbopack doesn't resolve maplibre-gl's bundler-relative worker URL correctly,
    // so point it at the worker bundle copied into /public instead.
    maplibregl.setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");

    const startId = getStoredMapStyleId();
    const startIndex = Math.max(0, MAP_STYLES.findIndex((s) => s.id === startId));
    styleIndexRef.current = startIndex;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: MAP_STYLES[startIndex].url,
      center: [100.9925, 13.7563],
      zoom: 5,
      attributionControl: false,
    });
    mapRef.current = map;

    map.on("load", () => {
      const initial = placesAtMountRef.current;
      if (initial.length > 0) {
        const bounds = new maplibregl.LngLatBounds();
        initial.forEach((p) => bounds.extend([p.lng, p.lat]));
        map.fitBounds(bounds, { padding: 72, maxZoom: 9, duration: 0 });
      }
    });

    onReady?.({
      zoomIn: () => map.zoomIn({ duration: 300 }),
      zoomOut: () => map.zoomOut({ duration: 300 }),
      locate: () => {
        if (typeof navigator === "undefined" || !navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            map.flyTo({ center: [pos.coords.longitude, pos.coords.latitude], zoom: 13, duration: 800 });
          },
          () => {
            // permission denied or unavailable — no-op
          },
          { enableHighAccuracy: true, timeout: 8000 },
        );
      },
      cycleStyle: () => {
        styleIndexRef.current = (styleIndexRef.current + 1) % MAP_STYLES.length;
        const next = MAP_STYLES[styleIndexRef.current];
        map.setStyle(next.url);
        setStoredMapStyleId(next.id);
      },
    });

    return () => {
      Object.values(markersRef.current).forEach((m) => m.remove());
      markersRef.current = {};
      map.remove();
      mapRef.current = null;
    };
    // mount-only: the map instance is created once and kept for the component's lifetime
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const currentIds = new Set(places.map((p) => p.id));
    Object.keys(markersRef.current).forEach((id) => {
      if (!currentIds.has(id)) {
        markersRef.current[id].remove();
        delete markersRef.current[id];
      }
    });

    places.forEach((p) => {
      const meta = STATUS[p.status];
      const isSel = p.id === selectedId;
      let marker = markersRef.current[p.id];
      if (!marker) {
        const el = document.createElement("div");
        el.style.display = "flex";
        el.style.flexDirection = "column";
        el.style.alignItems = "center";
        el.style.cursor = "pointer";
        el.setAttribute("role", "button");
        el.setAttribute("tabindex", "0");
        el.addEventListener("click", () => onSelectRef.current(p.id));
        el.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelectRef.current(p.id);
          }
        });
        marker = new maplibregl.Marker({ element: el, anchor: "bottom" })
          .setLngLat([p.lng, p.lat])
          .addTo(map);
        markersRef.current[p.id] = marker;
      }
      const el = marker.getElement();
      el.setAttribute("aria-label", `${p.name} — ${meta.label}`);
      el.style.zIndex = isSel ? "10" : "1";
      el.innerHTML = markerInnerHtml(p.name, isSel ? 42 : 30, meta.dot, isSel);
    });
  }, [places, selectedId]);

  return <div ref={containerRef} className={className} />;
}
