"use client";

import { useState } from "react";
import Link from "next/link";
import { AppHeader } from "@/components/AppHeader";
import { SparkleIcon } from "@/components/icons";

type ProviderId = "claude" | "gemini";

const PROVIDERS: { id: ProviderId; name: string; model: string }[] = [
  { id: "claude", name: "Claude", model: "claude-haiku-5-5" },
  { id: "gemini", name: "Gemini", model: "gemini-2.5-flash" },
];

export default function AddAiPage() {
  const [provider, setProvider] = useState<ProviderId>("claude");
  const providerName = PROVIDERS.find((p) => p.id === provider)!.name;

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader showAddCta={false} />

      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-6 px-6 pt-8 pb-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <Link href="/" className="text-[13px] no-underline">
              ← กลับไปแผนที่
            </Link>
            <h1 className="mt-1.5 mb-1 text-[30px] font-bold">เพิ่มสถานที่ด้วย AI</h1>
            <p className="m-0 text-[15px] text-[#5B6B67]">
              วางข้อความรีวิว แผนทริป ลิงก์บทความ หรือพิมพ์ชื่อสถานที่ — AI จะแยกสถานที่ หาพิกัด จัด
              Collection ตามจังหวัด และแนะนำแท็กให้
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-start gap-6">
          {/* Input */}
          <section
            aria-label="ข้อมูลนำเข้า"
            className="box-border flex min-w-0 flex-1 basis-[400px] flex-col gap-[18px] rounded-2xl border border-[#DDE3E1] bg-white p-6"
          >
            <fieldset className="m-0 border-0 p-0">
              <legend className="mb-2 text-xs font-semibold tracking-wider text-[#5B6B67]">
                AI PROVIDER
              </legend>
              <div className="grid grid-cols-2 gap-2">
                {PROVIDERS.map((p) => {
                  const on = p.id === provider;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setProvider(p.id)}
                      aria-pressed={on}
                      className="flex flex-col items-start gap-0.5 rounded-xl border-[1.5px] px-3.5 py-3 text-left"
                      style={
                        on
                          ? { borderColor: "#0E7C66", background: "#F2FAF7", color: "#0F1F1C" }
                          : { borderColor: "#D5DDDA", background: "#FFFFFF", color: "#0F1F1C" }
                      }
                    >
                      <span className="text-[15px] font-semibold">{p.name}</span>
                      <span className="font-mono text-xs text-[#5B6B67]">{p.model}</span>
                      <span className="text-xs text-[#0B5E4E]">● ตั้งค่า key แล้ว</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="flex flex-col gap-2">
              <label htmlFor="src" className="text-xs font-semibold tracking-wider text-[#5B6B67]">
                ข้อความ / ลิงก์
              </label>
              <textarea
                id="src"
                rows={7}
                defaultValue="ทริปน่าน–เชียงราย 4 วัน: วันแรกเข้าเมืองน่าน ไหว้วัดภูมินทร์ดูภาพกระซิบรักบันลือโลก เย็นขึ้นดอยเสมอดาวดูดาว วันที่สามข้ามไปเชียงราย แวะวัดร่องเสือเต้น ปิดท้ายวัดร่องขุ่น"
                className="box-border w-full resize-y rounded-xl border border-[#CBD5D1] bg-[#F8FAF9] p-3.5 text-[15px] leading-relaxed text-[#0F1F1C]"
              />
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="min-h-9 rounded-lg border border-dashed border-[#A9B6B2] bg-white px-3 text-[13px] text-[#3D4D49]"
                >
                  + วาง URL
                </button>
                <button
                  type="button"
                  className="min-h-9 rounded-lg border border-dashed border-[#A9B6B2] bg-white px-3 text-[13px] text-[#3D4D49]"
                >
                  + แนบภาพหน้าจอ
                </button>
              </div>
            </div>

            <fieldset className="m-0 flex flex-col gap-1.5 border-0 p-0">
              <legend className="mb-2 text-xs font-semibold tracking-wider text-[#5B6B67]">ตัวเลือก</legend>
              <label className="flex min-h-9 items-center gap-2.5 text-sm">
                <input type="checkbox" defaultChecked className="h-[18px] w-[18px] accent-[#0E7C66]" />
                หาพิกัดอัตโนมัติ (Nominatim / OSM)
              </label>
              <label className="flex min-h-9 items-center gap-2.5 text-sm">
                <input type="checkbox" defaultChecked className="h-[18px] w-[18px] accent-[#0E7C66]" />
                ดึงรูปจาก Wikimedia Commons
              </label>
              <label className="flex min-h-9 items-center gap-2.5 text-sm">
                <input type="checkbox" defaultChecked className="h-[18px] w-[18px] accent-[#0E7C66]" />
                จัดเข้า Collection ตามจังหวัด (สร้างใหม่ถ้ายังไม่มี)
              </label>
              <label className="flex min-h-9 items-center gap-2.5 text-sm">
                <input type="checkbox" defaultChecked className="h-[18px] w-[18px] accent-[#0E7C66]" />
                ตรวจสถานที่ซ้ำ
              </label>
            </fieldset>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="defst" className="text-xs font-semibold tracking-wider text-[#5B6B67]">
                สถานะเริ่มต้น
              </label>
              <select
                id="defst"
                defaultValue="trip"
                className="h-11 rounded-[10px] border border-[#CBD5D1] bg-white px-3 text-sm text-[#0F1F1C]"
              >
                <option value="want">อยากไป</option>
                <option value="trip">อยู่ในทริปกำลังไป</option>
                <option value="visited">ไปมาแล้ว</option>
                <option value="fav">สถานที่โปรด</option>
                <option value="never">ไปแล้วไม่ไปอีก</option>
              </select>
            </div>

            <button
              type="button"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-0 bg-[#0E7C66] text-[15px] font-semibold text-white"
            >
              <SparkleIcon />
              วิเคราะห์ด้วย {providerName}
            </button>
            <p className="m-0 text-xs text-[#5B6B67]">
              ใช้ API key ของคุณเอง · ข้อความถูกส่งผ่านเซิร์ฟเวอร์ของแอป (Vercel Function) ไปยัง
              provider ที่เลือกเท่านั้น
            </p>
          </section>

          {/* Results */}
          <section
            aria-label="ผลลัพธ์"
            className="box-border flex min-w-0 flex-[1.3_1_480px] flex-col gap-3.5 rounded-2xl border border-[#DDE3E1] bg-white p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="m-0 text-lg font-bold">พบ 4 สถานที่</h2>
              <span className="rounded-full bg-[#E1F3EE] px-2.5 py-1 text-xs font-semibold text-[#0B5E4E]">
                เลือกไว้ 3 · ซ้ำ 1
              </span>
            </div>

            {[
              {
                name: "วัดภูมินทร์",
                coord: "18.7756, 100.7712",
                prov: "น่าน",
                tags: [{ label: "+ Collection ใหม่", kind: "new" as const }, { label: "#วัด" }, { label: "#สถาปัตยกรรม" }],
                quote: "“ภาพจิตรกรรมฝาผนังกระซิบรักบันลือโลก”",
              },
              {
                name: "ดอยเสมอดาว",
                coord: "[พิกัดจาก geocoder]",
                prov: "น่าน",
                tags: [{ label: "#ภูเขา" }, { label: "#จุดชมวิว" }],
                quote: "“เย็นขึ้นดอยเสมอดาวดูดาว”",
              },
              {
                name: "วัดร่องเสือเต้น",
                coord: "19.9241, 99.8414",
                prov: "เชียงราย",
                tags: [{ label: "#วัด" }],
                quote: "“แวะวัดร่องเสือเต้น”",
              },
            ].map((place) => (
              <article
                key={place.name}
                className="flex gap-3.5 rounded-2xl border-[1.5px] border-[#0E7C66] bg-[#F7FCFA] p-3.5"
              >
                <input
                  type="checkbox"
                  defaultChecked
                  aria-label={`เลือก ${place.name}`}
                  className="mt-1 h-5 w-5 accent-[#0E7C66]"
                />
                <div
                  aria-hidden="true"
                  className="h-[88px] w-[88px] flex-none rounded-[10px]"
                  style={{
                    background: "repeating-linear-gradient(135deg, #D5DFDB 0 8px, #E2E9E6 8px 16px)",
                  }}
                />
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <h3 className="m-0 text-base font-semibold">{place.name}</h3>
                    <span className="font-mono text-xs text-[#5B6B67]">{place.coord}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="rounded-md bg-[#F0F3F2] px-2 py-0.5 text-xs text-[#22312E]">
                      {place.prov}
                    </span>
                    {place.tags.map((t) =>
                      t.kind === "new" ? (
                        <span
                          key={t.label}
                          className="rounded-md bg-[#FDF0DC] px-2 py-0.5 text-xs font-semibold text-[#8A3B08]"
                        >
                          {t.label}
                        </span>
                      ) : (
                        <span
                          key={t.label}
                          className="rounded-md border border-dashed border-[#A9B6B2] px-2 py-0.5 text-xs text-[#22312E]"
                        >
                          {t.label}
                        </span>
                      ),
                    )}
                  </div>
                  <p className="m-0 text-[13px] text-[#3D4D49]">{place.quote}</p>
                </div>
              </article>
            ))}

            <article className="flex gap-3.5 rounded-2xl border border-[#E3E8E6] bg-[#F8FAF9] p-3.5">
              <input type="checkbox" aria-label="เลือก วัดร่องขุ่น" className="mt-1 h-5 w-5 accent-[#0E7C66]" />
              <div aria-hidden="true" className="h-[88px] w-[88px] flex-none rounded-[10px] bg-[#E3E9E6]" />
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 className="m-0 text-base font-semibold text-[#3D4D49]">วัดร่องขุ่น</h3>
                  <span className="rounded-md bg-[#EDEFF2] px-2 py-0.5 text-xs font-semibold text-[#374151]">
                    มีอยู่แล้ว
                  </span>
                </div>
                <p className="m-0 text-[13px] text-[#3D4D49]">
                  บันทึกไว้ใน เชียงราย · สถานะ สถานที่โปรด —{" "}
                  <Link href="/">ดูบนแผนที่</Link>
                </p>
              </div>
            </article>

            <div className="flex flex-wrap justify-end gap-2.5 border-t border-[#E3E8E6] pt-3.5">
              <button
                type="button"
                className="min-h-11 rounded-[10px] border border-[#CBD5D1] bg-white px-4.5 text-sm text-[#22312E]"
              >
                ยกเลิก
              </button>
              <Link
                href="/"
                className="inline-flex min-h-11 items-center rounded-[10px] bg-[#0F1F1C] px-5 text-sm font-semibold text-white no-underline"
              >
                บันทึก 3 สถานที่
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
