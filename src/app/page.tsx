"use client";

import { useMemo, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { MapView, type MapControls } from "@/components/MapView";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FolderIcon,
  LayersIcon,
  LocateIcon,
  NavigateIcon,
  PhotoIcon,
  SearchIcon,
  TrashIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "@/components/icons";
import { PLACES, STATUS, STATUS_ORDER } from "@/lib/places";
import type { StatusKey } from "@/lib/types";

const chipStyle = (on: boolean) =>
  on
    ? "bg-[#0F1F1C] text-white border-[#0F1F1C]"
    : "bg-white text-[#22312E] border-[#D5DDDA]";

export default function MainPage() {
  const [selId, setSelId] = useState<string | null>(null);
  const [rightView, setRightView] = useState<"list" | "detail">("list");
  const [status, setStatus] = useState<"all" | StatusKey>("all");
  const [col, setCol] = useState("all");
  const [tag, setTag] = useState("all");
  const [q, setQ] = useState("");
  const [overrides, setOverrides] = useState<Record<string, StatusKey>>({});
  const [mapControls, setMapControls] = useState<MapControls | null>(null);
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);

  const all = useMemo(
    () => PLACES.map((p) => ({ ...p, status: overrides[p.id] || p.status })),
    [overrides],
  );

  const query = q.trim().toLowerCase();
  const visible = all.filter(
    (p) =>
      (status === "all" || p.status === status) &&
      (col === "all" || p.prov === col) &&
      (tag === "all" || p.tags.includes(tag)) &&
      (!query ||
        `${p.name} ${p.prov} ${p.tags.join(" ")}`.toLowerCase().includes(query)),
  );

  const provinces: string[] = [];
  all.forEach((p) => {
    if (!provinces.includes(p.prov)) provinces.push(p.prov);
  });
  const tags: string[] = [];
  all.forEach((p) => p.tags.forEach((t) => !tags.includes(t) && tags.push(t)));

  const selected = selId ? all.find((p) => p.id === selId) : undefined;

  const selectPlace = (id: string) => {
    setSelId(id);
    setRightView("detail");
    setRightOpen(true);
  };

  const clearFilters = () => {
    setQ("");
    setStatus("all");
    setCol("all");
    setTag("all");
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <AppHeader active="map" />

      <div className="flex min-h-0 flex-1">
        {/* Left: filters */}
        <div
          className={
            "overflow-hidden border-[#DDE3E1] bg-white transition-[width] duration-300 ease-in-out " +
            (leftOpen ? "w-[340px] border-r" : "w-0 border-r-0")
          }
        >
        <aside
          aria-label="ตัวกรอง"
          inert={!leftOpen}
          className="flex h-full w-[340px] flex-col gap-[18px] overflow-y-auto overscroll-contain p-5"
        >
          <section className="flex flex-col gap-2">
            <h2 className="m-0 text-xs font-semibold tracking-wider text-[#5B6B67]">
              STATUS · สถานะ
            </h2>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setStatus("all")}
                className={`inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3 text-[13px] font-medium ${chipStyle(status === "all")}`}
              >
                <span
                  className="h-2 w-2 rounded-full shadow-[0_0_0_2px_#FFFFFF]"
                  style={{ background: "#0F1F1C" }}
                />
                ทั้งหมด
                <span className="font-mono text-xs opacity-80">{all.length}</span>
              </button>
              {STATUS_ORDER.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setStatus(k)}
                  className={`inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3 text-[13px] font-medium ${chipStyle(status === k)}`}
                >
                  <span
                    className="h-2 w-2 rounded-full shadow-[0_0_0_2px_#FFFFFF]"
                    style={{ background: STATUS[k].dot }}
                  />
                  {STATUS[k].label}
                  <span className="font-mono text-xs opacity-80">
                    {all.filter((p) => p.status === k).length}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <h2 className="m-0 text-xs font-semibold tracking-wider text-[#5B6B67]">
                COLLECTIONS · จังหวัด
              </h2>
              <a href="/graph" className="text-xs">
                จัดการ
              </a>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setCol("all")}
                className={`inline-flex min-h-[34px] items-center gap-1.5 rounded-lg border px-2.5 text-[13px] ${chipStyle(col === "all")}`}
              >
                <FolderIcon />
                ทุกจังหวัด
                <span className="font-mono text-xs opacity-75">{all.length}</span>
              </button>
              {provinces.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setCol(v)}
                  className={`inline-flex min-h-[34px] items-center gap-1.5 rounded-lg border px-2.5 text-[13px] ${chipStyle(col === v)}`}
                >
                  <FolderIcon />
                  {v}
                  <span className="font-mono text-xs opacity-75">
                    {all.filter((p) => p.prov === v).length}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="m-0 text-xs font-semibold tracking-wider text-[#5B6B67]">
              TAGS · ประเภท
            </h2>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setTag("all")}
                className={`min-h-8 rounded-md border px-2.5 text-[13px] ${chipStyle(tag === "all")}`}
              >
                ทั้งหมด
              </button>
              {tags.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTag(t)}
                  className={`min-h-8 rounded-md border px-2.5 text-[13px] ${chipStyle(tag === t)}`}
                >
                  #{t}
                </button>
              ))}
            </div>
          </section>

          <div className="flex items-center justify-between border-t border-[#E3E8E6] pt-3.5">
            <p className="m-0 text-[13px] text-[#5B6B67]">
              แสดง <strong className="text-[#0F1F1C]">{visible.length}</strong> จาก{" "}
              {all.length} สถานที่
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="min-h-8 rounded-md border-0 bg-transparent px-2.5 text-[13px] font-semibold text-[#0B5E4E]"
            >
              ล้างตัวกรอง
            </button>
          </div>
        </aside>
        </div>

        {/* Map */}
        <main
          aria-label="แผนที่"
          className="relative min-w-0 flex-1 overflow-hidden bg-[#E8EEE9]"
        >
          <MapView
            places={visible}
            selectedId={selId}
            onSelect={selectPlace}
            onReady={setMapControls}
            className="absolute inset-0 h-full w-full"
          />

          <button
            type="button"
            onClick={() => setLeftOpen((v) => !v)}
            aria-label={leftOpen ? "ซ่อนแผงตัวกรอง" : "แสดงแผงตัวกรอง"}
            aria-expanded={leftOpen}
            className="absolute top-1/2 left-2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(15,31,28,0.18)]"
          >
            {leftOpen ? (
              <ChevronLeftIcon size={16} className="text-[#22312E]" />
            ) : (
              <ChevronRightIcon size={16} className="text-[#22312E]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setRightOpen((v) => !v)}
            aria-label={rightOpen ? "ซ่อนแผงสถานที่" : "แสดงแผงสถานที่"}
            aria-expanded={rightOpen}
            className="absolute top-1/2 right-2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(15,31,28,0.18)]"
          >
            {rightOpen ? (
              <ChevronRightIcon size={16} className="text-[#22312E]" />
            ) : (
              <ChevronLeftIcon size={16} className="text-[#22312E]" />
            )}
          </button>

          <div className="absolute top-4 left-4 flex flex-col gap-1.5 rounded-xl bg-white p-3.5 shadow-[0_4px_16px_rgba(15,31,28,0.12)]">
            <span className="text-[11px] font-semibold tracking-wider text-[#5B6B67]">
              LEGEND
            </span>
            {STATUS_ORDER.map((k) => (
              <span key={k} className="flex items-center gap-2 text-xs text-[#22312E]">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: STATUS[k].dot }}
                />
                {STATUS[k].label}
              </span>
            ))}
          </div>

          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-[0_4px_16px_rgba(15,31,28,0.12)]">
              <button
                type="button"
                aria-label="ซูมเข้า"
                onClick={() => mapControls?.zoomIn()}
                className="h-11 w-11 border-b border-[#E3E8E6] bg-white"
              >
                <ZoomInIcon className="mx-auto text-[#22312E]" />
              </button>
              <button
                type="button"
                aria-label="ซูมออก"
                onClick={() => mapControls?.zoomOut()}
                className="h-11 w-11 bg-white"
              >
                <ZoomOutIcon className="mx-auto text-[#22312E]" />
              </button>
            </div>
            <button
              type="button"
              aria-label="ตำแหน่งของฉัน"
              onClick={() => mapControls?.locate()}
              className="h-11 w-11 rounded-xl bg-white shadow-[0_4px_16px_rgba(15,31,28,0.12)]"
            >
              <LocateIcon className="mx-auto text-[#22312E]" />
            </button>
            <button
              type="button"
              aria-label="เปลี่ยนสไตล์แผนที่"
              onClick={() => mapControls?.cycleStyle()}
              className="h-11 w-11 rounded-xl bg-white shadow-[0_4px_16px_rgba(15,31,28,0.12)]"
            >
              <LayersIcon className="mx-auto text-[#22312E]" />
            </button>
          </div>

          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-xl bg-white p-1.5 shadow-[0_4px_16px_rgba(15,31,28,0.12)]">
            <button
              type="button"
              className="min-h-9 rounded-lg bg-[#0F1F1C] px-3.5 text-[13px] font-semibold text-white"
            >
              หมุด
            </button>
            <button type="button" className="min-h-9 rounded-lg bg-transparent px-3.5 text-[13px] text-[#22312E]">
              Cluster
            </button>
            <button type="button" className="min-h-9 rounded-lg bg-transparent px-3.5 text-[13px] text-[#22312E]">
              Heatmap
            </button>
          </div>

          <p className="absolute right-3 bottom-2 m-0 rounded bg-white/85 px-1.5 py-0.5 text-[11px] text-[#3D4D49]">
            MapLibre · © OpenFreeMap · © OpenStreetMap contributors
          </p>
        </main>

        {/* Right: places list / selected place detail */}
        <div
          className={
            "overflow-hidden border-[#DDE3E1] bg-white transition-[width] duration-300 ease-in-out " +
            (rightOpen ? "w-[340px] border-l" : "w-0 border-l-0")
          }
        >
        <aside
          aria-label={rightView === "list" ? "สถานที่" : "รายละเอียดสถานที่"}
          inert={!rightOpen}
          className="flex h-full w-[340px] flex-col overflow-hidden"
        >
          {rightView === "list" || !selected ? (
            <div className="flex h-full flex-col">
              <div className="flex flex-none flex-col gap-3 border-b border-[#DDE3E1] p-5">
                <div className="relative">
                  <label htmlFor="q" className="sr-only">
                    ค้นหาสถานที่
                  </label>
                  <SearchIcon
                    size={18}
                    className="absolute top-[13px] left-3.5 text-[#5B6B67]"
                  />
                  <input
                    id="q"
                    type="search"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="ค้นหาชื่อ จังหวัด หรือแท็ก…"
                    className="h-11 w-full rounded-[10px] border border-[#CBD5D1] bg-[#F8FAF9] pr-3.5 pl-[42px] text-[15px] text-[#0F1F1C]"
                  />
                </div>
                <h2 className="m-0 text-xs font-semibold tracking-wider text-[#5B6B67]">
                  สถานที่ ({visible.length})
                </h2>
              </div>

              <ul className="m-0 flex min-h-0 flex-1 list-none flex-col gap-2 overflow-y-auto overscroll-contain p-4">
                {visible.map((p) => {
                  const m = STATUS[p.status];
                  const on = p.id === selId;
                  return (
                    <li key={p.id}>
                      <button
                        type="button"
                        onClick={() => selectPlace(p.id)}
                        className={
                          "flex w-full items-center gap-3 rounded-xl border p-2.5 text-left text-[#0F1F1C] " +
                          (on ? "border-[#0E7C66] bg-[#F2FAF7]" : "border-[#E3E8E6] bg-white")
                        }
                      >
                        <span
                          aria-hidden="true"
                          className="flex h-[52px] w-[52px] flex-none items-center justify-center rounded-[9px]"
                          style={{
                            background:
                              "repeating-linear-gradient(135deg, #DCE4E1 0 6px, #E8EEEB 6px 12px)",
                          }}
                        >
                          <PhotoIcon className="text-[#7A8A86]" />
                        </span>
                        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                          <span className="overflow-hidden text-[15px] font-semibold text-ellipsis whitespace-nowrap">
                            {p.name}
                          </span>
                          <span className="text-xs text-[#5B6B67]">
                            {p.prov} · {p.tags.map((t) => `#${t}`).join(" ")}
                          </span>
                        </span>
                        <span
                          className="inline-flex flex-none items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold"
                          style={{ background: m.bg, color: m.fg }}
                        >
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ background: m.dot }}
                          />
                          {m.label}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              {visible.length === 0 && (
                <p className="m-0 p-5 text-center text-sm text-[#5B6B67]">
                  ไม่พบสถานที่ที่ตรงกับตัวกรอง
                </p>
              )}
            </div>
          ) : (
            <div className="flex h-full flex-col overflow-y-auto overscroll-contain">
              <button
                type="button"
                onClick={() => setRightView("list")}
                className="flex flex-none items-center gap-1.5 border-b border-[#DDE3E1] px-5 py-3 text-left text-[13px] font-medium text-[#3D4D49]"
              >
                <ChevronLeftIcon size={16} />
                กลับไปรายการสถานที่
              </button>

              <div
                className="relative flex h-[13rem] flex-none items-center justify-center"
                style={{
                  background:
                    "repeating-linear-gradient(135deg, #D5DFDB 0 10px, #E2E9E6 10px 20px)",
                }}
              >
                <span className="flex flex-col items-center gap-1.5 text-[13px] text-[#3D4D49]">
                  <PhotoIcon size={28} className="text-[#5B6B67]" />[รูปถ่าย: {selected.name}]
                </span>
                <span className="absolute bottom-2.5 left-3 rounded-md bg-[#0F1F1C]/78 px-2 py-0.5 text-[11px] text-white">
                  Wikimedia Commons · CC BY-SA
                </span>
              </div>
              <div className="flex flex-none gap-1.5 px-5 pt-2.5">
                <span className="h-12 flex-1 rounded-lg bg-[#DCE4E1] outline-2 outline-offset-1 outline-[#0E7C66]" />
                <span className="h-12 flex-1 rounded-lg bg-[#E3E9E6]" />
                <span className="h-12 flex-1 rounded-lg bg-[#E3E9E6]" />
                <button
                  type="button"
                  className="h-12 flex-1 rounded-lg border border-dashed border-[#A9B6B2] bg-white text-xs text-[#3D4D49]"
                >
                  + รูป
                </button>
              </div>

              <div className="flex flex-col gap-4 px-5 py-4.5 pb-6">
                <div className="flex flex-col gap-1.5">
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-md bg-[#F0F3F2] px-2.5 py-1 text-xs text-[#3D4D49]">
                    <FolderIcon size={12} />
                    {selected.prov}
                  </span>
                  <h1 className="m-0 text-[26px] leading-tight font-bold">{selected.name}</h1>
                  <p className="m-0 font-mono text-xs text-[#5B6B67]">
                    {selected.lat.toFixed(4)}, {selected.lng.toFixed(4)}
                  </p>
                </div>

                <fieldset className="m-0 flex flex-col gap-2 border-0 p-0">
                  <legend className="mb-2 text-xs font-semibold tracking-wider text-[#5B6B67]">
                    สถานะ
                  </legend>
                  <div className="flex flex-wrap gap-1.5">
                    {STATUS_ORDER.map((k) => {
                      const m = STATUS[k];
                      const on = selected.status === k;
                      return (
                        <button
                          key={k}
                          type="button"
                          onClick={() => setOverrides((o) => ({ ...o, [selected.id]: k }))}
                          aria-pressed={on}
                          className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border px-2.5 text-[13px]"
                          style={
                            on
                              ? { background: m.bg, color: m.fg, borderColor: m.dot, fontWeight: 600 }
                              : { background: "#FFFFFF", color: "#22312E", borderColor: "#D5DDDA" }
                          }
                        >
                          <span className="h-2 w-2 rounded-full" style={{ background: m.dot }} />
                          {m.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold tracking-wider text-[#5B6B67]">แท็ก</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-[#F0F3F2] px-2.5 py-1 text-[13px] text-[#22312E]"
                      >
                        #{t}
                      </span>
                    ))}
                    <button
                      type="button"
                      className="min-h-[30px] rounded-md border border-dashed border-[#A9B6B2] bg-white px-2.5 text-[13px] text-[#3D4D49]"
                    >
                      + เพิ่มแท็ก
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold tracking-wider text-[#5B6B67]">บันทึก</span>
                  <p className="m-0 rounded-[10px] border border-[#E3E8E6] bg-[#F8FAF9] p-3 text-sm leading-relaxed text-[#22312E]">
                    {selected.note}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <a
                    href={`https://www.openstreetmap.org/directions?to=${selected.lat.toFixed(4)}%2C${selected.lng.toFixed(4)}`}
                    className="flex min-h-11 flex-1 basis-[140px] items-center justify-center gap-1.5 rounded-[10px] bg-[#0F1F1C] text-sm font-semibold text-white no-underline"
                  >
                    <NavigateIcon />
                    นำทาง
                  </a>
                  <button
                    type="button"
                    className="min-h-11 flex-1 basis-[100px] rounded-[10px] border border-[#CBD5D1] bg-white text-sm font-medium text-[#22312E]"
                  >
                    แก้ไข
                  </button>
                  <button
                    type="button"
                    aria-label="ลบสถานที่"
                    className="h-11 min-h-11 w-11 flex-none rounded-[10px] border border-[#F1C9C4] bg-white"
                  >
                    <TrashIcon className="mx-auto text-[#B42318]" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </aside>
        </div>
      </div>
    </div>
  );
}
