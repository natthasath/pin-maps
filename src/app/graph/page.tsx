import type { Metadata } from "next";
import Link from "next/link";
import { AppHeader } from "@/components/AppHeader";

export const metadata: Metadata = {
  title: "PinMaps — กราฟความสัมพันธ์",
};

const collectionNodes = [
  { label: "เชียงราย", x: 150, y: 110 },
  { label: "เชียงใหม่", x: 150, y: 250, highlighted: true },
  { label: "กาญจนบุรี", x: 150, y: 390 },
  { label: "กระบี่", x: 150, y: 520 },
  { label: "สตูล", x: 150, y: 620 },
];

const placeNodes = [
  { label: "วัดร่องขุ่น", x: 440, y: 80, dot: "#E8890C" },
  { label: "ภูชี้ฟ้า", x: 520, y: 170, dot: "#2563EB" },
  { label: "ดอยสุเทพ", x: 420, y: 260, dot: "#0E7C66" },
  { label: "ดอยอินทนนท์", x: 540, y: 320, selected: true },
  { label: "น้ำตกเอราวัณ", x: 430, y: 420, dot: "#0E7C66" },
  { label: "หาดไร่เลย์", x: 530, y: 510, dot: "#E8890C" },
  { label: "เกาะหลีเป๊ะ", x: 450, y: 610, dot: "#2563EB" },
];

const tagNodes = [
  { label: "#วัด", x: 810, y: 120 },
  { label: "#ภูเขา", x: 810, y: 240, highlighted: true },
  { label: "#น้ำตก", x: 810, y: 360 },
  { label: "#ทะเล", x: 810, y: 480 },
  { label: "#จุดชมวิว", x: 810, y: 600, highlighted: true },
];

export default function GraphPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader active="graph" />

      <div className="flex flex-1 flex-wrap">
        <aside
          aria-label="ตัวเลือกกราฟ"
          className="flex flex-1 basis-[280px] flex-col gap-[22px] border-r border-[#DDE3E1] bg-white p-5"
        >
          <div>
            <h1 className="m-0 mb-1 text-[22px] font-bold">กราฟความสัมพันธ์</h1>
            <p className="m-0 text-[13px] leading-relaxed text-[#5B6B67]">
              ดูว่าสถานที่เชื่อมกับจังหวัด แท็ก และสถานะอย่างไร คลิกโหนดเพื่อไฮไลต์เส้นเชื่อม
            </p>
          </div>

          <section className="flex flex-col gap-2">
            <h2 className="m-0 text-xs font-semibold tracking-wider text-[#5B6B67]">LAYOUT</h2>
            <div className="grid grid-cols-3 gap-1 rounded-[10px] bg-[#F0F3F2] p-1">
              <button
                type="button"
                className="min-h-9 rounded-[7px] bg-white text-[13px] font-semibold text-[#0F1F1C] shadow-[0_1px_3px_rgba(15,31,28,0.12)]"
              >
                Columns
              </button>
              <button type="button" className="min-h-9 rounded-[7px] bg-transparent text-[13px] text-[#3D4D49]">
                Force
              </button>
              <button type="button" className="min-h-9 rounded-[7px] bg-transparent text-[13px] text-[#3D4D49]">
                Radial
              </button>
            </div>
          </section>

          <section className="flex flex-col gap-2.5">
            <h2 className="m-0 text-xs font-semibold tracking-wider text-[#5B6B67]">แสดงโหนด</h2>
            <label className="flex min-h-8 items-center gap-2.5 text-sm">
              <input type="checkbox" defaultChecked className="h-[18px] w-[18px] accent-[#0E7C66]" />
              <span className="h-3.5 w-3.5 rounded bg-[#0F1F1C]" />
              Collections (จังหวัด)
            </label>
            <label className="flex min-h-8 items-center gap-2.5 text-sm">
              <input type="checkbox" defaultChecked className="h-[18px] w-[18px] accent-[#0E7C66]" />
              <span className="h-3.5 w-3.5 rounded-full border-2 border-[#0F1F1C] bg-white" />
              สถานที่
            </label>
            <label className="flex min-h-8 items-center gap-2.5 text-sm">
              <input type="checkbox" defaultChecked className="h-[18px] w-[18px] accent-[#0E7C66]" />
              <span className="h-3 w-[18px] rounded-full border-[1.5px] border-dashed border-[#3D4D49]" />
              Tags
            </label>
            <label className="flex min-h-8 items-center gap-2.5 text-sm">
              <input type="checkbox" className="h-[18px] w-[18px] accent-[#0E7C66]" />
              <span className="h-3.5 w-3.5 rotate-45 bg-[#7C3AED]" />
              ทริป
            </label>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="m-0 text-xs font-semibold tracking-wider text-[#5B6B67]">
              สีของสถานที่ = สถานะ
            </h2>
            <span className="flex items-center gap-2 text-[13px]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#2563EB]" />อยากไป
            </span>
            <span className="flex items-center gap-2 text-[13px]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#7C3AED]" />อยู่ในทริปกำลังไป
            </span>
            <span className="flex items-center gap-2 text-[13px]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#0E7C66]" />ไปมาแล้ว
            </span>
            <span className="flex items-center gap-2 text-[13px]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#E8890C]" />สถานที่โปรด
            </span>
            <span className="flex items-center gap-2 text-[13px]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#64748B]" />ไปแล้วไม่ไปอีก
            </span>
          </section>
        </aside>

        <main aria-label="กราฟ" className="flex min-w-0 flex-[999_1_560px] flex-col gap-3 p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="m-0 text-[13px] text-[#5B6B67]">
              <strong className="text-[#0F1F1C]">7</strong> สถานที่ ·{" "}
              <strong className="text-[#0F1F1C]">5</strong> collections ·{" "}
              <strong className="text-[#0F1F1C]">5</strong> tags ·{" "}
              <strong className="text-[#0F1F1C]">16</strong> เส้นเชื่อม
            </p>
            <div className="flex gap-1.5">
              <button
                type="button"
                className="min-h-9 rounded-lg border border-[#CBD5D1] bg-white px-3 text-[13px] text-[#22312E]"
              >
                พอดีจอ
              </button>
              <button
                type="button"
                className="min-h-9 rounded-lg border border-[#CBD5D1] bg-white px-3 text-[13px] text-[#22312E]"
              >
                ส่งออก PNG
              </button>
            </div>
          </div>

          <div className="overflow-auto rounded-2xl border border-[#DDE3E1] bg-white">
            <div
              className="relative mx-auto h-[680px] w-[960px]"
              style={{
                backgroundImage: "radial-gradient(#E1E7E4 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            >
              <svg width="960" height="680" viewBox="0 0 960 680" aria-hidden="true" className="absolute inset-0">
                <g stroke="#B7C4C0" strokeWidth="1.5" fill="none">
                  <path d="M150 110 L440 80" />
                  <path d="M150 110 L520 170" />
                  <path d="M150 250 L420 260" />
                  <path d="M150 390 L430 420" />
                  <path d="M150 520 L530 510" />
                  <path d="M150 620 L450 610" />
                </g>
                <g stroke="#C9D3D0" strokeWidth="1.5" strokeDasharray="5 5" fill="none">
                  <path d="M440 80 L810 120" />
                  <path d="M420 260 L810 120" />
                  <path d="M520 170 L810 240" />
                  <path d="M520 170 L810 600" />
                  <path d="M430 420 L810 360" />
                  <path d="M530 510 L810 480" />
                  <path d="M450 610 L810 480" />
                  <path d="M420 260 L810 600" />
                </g>
                <g stroke="#7C3AED" strokeWidth="3" fill="none">
                  <path d="M150 250 L540 320" />
                  <path d="M540 320 L810 240" strokeDasharray="7 5" />
                  <path d="M540 320 L810 600" strokeDasharray="7 5" />
                </g>
              </svg>

              {collectionNodes.map((n) => (
                <button
                  key={n.label}
                  type="button"
                  style={{ left: n.x, top: n.y }}
                  className={
                    "absolute min-h-10 -translate-x-1/2 -translate-y-1/2 rounded-[10px] bg-[#0F1F1C] px-3.5 text-sm font-semibold text-white whitespace-nowrap" +
                    (n.highlighted ? " shadow-[0_0_0_4px_#E9E0FD]" : "")
                  }
                >
                  {n.label}
                </button>
              ))}

              {placeNodes.map((n) =>
                n.selected ? (
                  <button
                    key={n.label}
                    type="button"
                    aria-pressed="true"
                    style={{ left: n.x, top: n.y }}
                    className="absolute flex min-h-11 -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-[#7C3AED] py-0 pr-4 pl-2 text-sm font-semibold whitespace-nowrap text-white shadow-[0_0_0_6px_#E9E0FD,0_8px_20px_rgba(124,58,237,0.3)]"
                  >
                    <span className="h-[26px] w-[26px] rounded-full bg-white" />
                    {n.label}
                  </button>
                ) : (
                  <button
                    key={n.label}
                    type="button"
                    style={{ left: n.x, top: n.y, borderColor: n.dot }}
                    className="absolute flex min-h-9 -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border-[1.5px] bg-white py-0 pr-3 pl-1.5 text-[13px] whitespace-nowrap text-[#0F1F1C]"
                  >
                    <span className="h-[22px] w-[22px] rounded-full" style={{ background: n.dot }} />
                    {n.label}
                  </button>
                ),
              )}

              {tagNodes.map((n) => (
                <button
                  key={n.label}
                  type="button"
                  style={{ left: n.x, top: n.y }}
                  className={
                    "absolute min-h-[34px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-dashed px-3.5 text-[13px] whitespace-nowrap " +
                    (n.highlighted
                      ? "border-[#7C3AED] bg-[#F5F0FE] font-semibold text-[#5B21B6]"
                      : "border-[#3D4D49] bg-[#F8FAF9] text-[#22312E]")
                  }
                >
                  {n.label}
                </button>
              ))}

              <span className="absolute top-6 left-[150px] -translate-x-1/2 text-[11px] font-semibold tracking-widest text-[#5B6B67]">
                COLLECTIONS
              </span>
              <span className="absolute top-6 left-[480px] -translate-x-1/2 text-[11px] font-semibold tracking-widest text-[#5B6B67]">
                PLACES
              </span>
              <span className="absolute top-6 left-[810px] -translate-x-1/2 text-[11px] font-semibold tracking-widest text-[#5B6B67]">
                TAGS
              </span>
            </div>
          </div>
        </main>

        <aside
          aria-label="โหนดที่เลือก"
          className="flex flex-1 basis-[300px] flex-col gap-4 border-l border-[#DDE3E1] bg-white p-5"
        >
          <span className="w-fit self-start rounded-full bg-[#EFE8FD] px-2.5 py-1 text-xs font-semibold text-[#5B21B6]">
            อยู่ในทริปกำลังไป
          </span>
          <h2 className="m-0 text-2xl font-bold">ดอยอินทนนท์</h2>
          <div
            className="flex h-36 items-center justify-center rounded-xl text-[13px] text-[#3D4D49]"
            style={{
              background: "repeating-linear-gradient(135deg, #D5DFDB 0 10px, #E2E9E6 10px 20px)",
            }}
          >
            [รูปถ่าย: ดอยอินทนนท์]
          </div>
          <section className="flex flex-col gap-2">
            <h3 className="m-0 text-xs font-semibold tracking-wider text-[#5B6B67]">เชื่อมโยง 3 โหนด</h3>
            <Link
              href="/"
              className="flex min-h-11 items-center justify-between rounded-[10px] bg-[#F3F5F4] px-3 text-sm text-[#0F1F1C] no-underline"
            >
              <span>เชียงใหม่</span>
              <span className="text-xs text-[#5B6B67]">Collection</span>
            </Link>
            <Link
              href="/"
              className="flex min-h-11 items-center justify-between rounded-[10px] bg-[#F3F5F4] px-3 text-sm text-[#0F1F1C] no-underline"
            >
              <span>#ภูเขา</span>
              <span className="text-xs text-[#5B6B67]">Tag</span>
            </Link>
            <Link
              href="/"
              className="flex min-h-11 items-center justify-between rounded-[10px] bg-[#F3F5F4] px-3 text-sm text-[#0F1F1C] no-underline"
            >
              <span>#จุดชมวิว</span>
              <span className="text-xs text-[#5B6B67]">Tag</span>
            </Link>
          </section>
          <section className="flex flex-col gap-2">
            <h3 className="m-0 text-xs font-semibold tracking-wider text-[#5B6B67]">
              สถานที่ใกล้เคียง (แท็กเดียวกัน)
            </h3>
            <p className="m-0 text-sm leading-relaxed text-[#22312E]">ภูชี้ฟ้า · วัดพระธาตุดอยสุเทพ</p>
          </section>
          <Link
            href="/"
            className="flex min-h-11 items-center justify-center rounded-[10px] bg-[#0F1F1C] text-sm font-semibold text-white no-underline"
          >
            เปิดบนแผนที่
          </Link>
        </aside>
      </div>
    </div>
  );
}
