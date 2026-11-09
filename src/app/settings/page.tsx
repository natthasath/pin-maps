import type { Metadata } from "next";
import { AppHeader } from "@/components/AppHeader";
import { MapStyleSelect } from "@/components/MapStyleSelect";
import { WarningIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "PinMaps — ตั้งค่า",
};

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader active="settings" />

      <div className="mx-auto flex w-full max-w-[980px] flex-col gap-6 px-6 pt-8 pb-14">
        <h1 className="m-0 text-[30px] font-bold">ตั้งค่า</h1>

        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-[#F3C98B] bg-[#FDF0DC] px-4 py-3.5 text-[#6B2E05]"
        >
          <WarningIcon className="mt-0.5 flex-none" />
          <p className="m-0 text-sm leading-relaxed">
            คุณยังใช้รหัสผ่านเริ่มต้น{" "}
            <code className="rounded bg-white px-1.5 py-px font-mono">changeme</code>{" "}
            อยู่ กรุณาเปลี่ยนรหัสผ่านก่อนใช้งานจริง
          </p>
        </div>

        <section
          aria-labelledby="acc"
          className="flex flex-col gap-[18px] rounded-2xl border border-[#DDE3E1] bg-white p-6"
        >
          <div>
            <h2 id="acc" className="m-0 mb-1 text-lg font-bold">
              บัญชีและรหัสผ่าน
            </h2>
            <p className="m-0 text-sm text-[#5B6B67]">
              ผู้ใช้: <strong className="text-[#0F1F1C]">admin</strong> · รหัสผ่านเก็บแบบ hash
              (Argon2id) ใน Neon
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3.5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="cur" className="text-[13px] font-semibold">
                รหัสผ่านปัจจุบัน
              </label>
              <input
                id="cur"
                type="password"
                defaultValue="changeme"
                className="h-11 rounded-[10px] border border-[#CBD5D1] bg-[#F8FAF9] px-3 text-[15px]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="new" className="text-[13px] font-semibold">
                รหัสผ่านใหม่
              </label>
              <input
                id="new"
                type="password"
                defaultValue="trip-north-2026!"
                className="h-11 rounded-[10px] border border-[#CBD5D1] bg-white px-3 text-[15px]"
              />
              <div aria-hidden="true" className="mt-0.5 grid grid-cols-4 gap-1">
                <span className="h-1 rounded bg-[#0E7C66]" />
                <span className="h-1 rounded bg-[#0E7C66]" />
                <span className="h-1 rounded bg-[#0E7C66]" />
                <span className="h-1 rounded bg-[#DDE3E1]" />
              </div>
              <span className="text-xs text-[#0B5E4E]">ความปลอดภัย: ดี</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="cf" className="text-[13px] font-semibold">
                ยืนยันรหัสผ่านใหม่
              </label>
              <input
                id="cf"
                type="password"
                defaultValue="trip-north-2026!"
                className="h-11 rounded-[10px] border border-[#CBD5D1] bg-white px-3 text-[15px]"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="min-h-11 rounded-[10px] border-0 bg-[#0F1F1C] px-5 text-sm font-semibold text-white"
            >
              เปลี่ยนรหัสผ่าน
            </button>
          </div>
        </section>

        <section
          aria-labelledby="ai"
          className="flex flex-col gap-[18px] rounded-2xl border border-[#DDE3E1] bg-white p-6"
        >
          <div>
            <h2 id="ai" className="m-0 mb-1 text-lg font-bold">
              AI Providers
            </h2>
            <p className="m-0 text-sm text-[#5B6B67]">
              API key ถูกเข้ารหัส (AES-256-GCM) ก่อนเก็บในฐานข้อมูล และใช้ฝั่งเซิร์ฟเวอร์เท่านั้น
              ไม่ส่งไปที่เบราว์เซอร์
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
            <article className="flex flex-col gap-3 rounded-[14px] border-[1.5px] border-[#0E7C66] p-4.5">
              <div className="flex items-center justify-between">
                <h3 className="m-0 text-base font-bold">
                  Claude <span className="font-normal text-[#5B6B67]">· Anthropic</span>
                </h3>
                <span className="rounded-full bg-[#E1F3EE] px-2 py-0.5 text-xs font-semibold text-[#0B5E4E]">
                  ค่าเริ่มต้น
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="ck" className="text-[13px] font-semibold">
                  API Key
                </label>
                <input
                  id="ck"
                  type="text"
                  defaultValue="sk-ant-••••••••••••••••Q7xA"
                  className="h-11 rounded-[10px] border border-[#CBD5D1] bg-[#F8FAF9] px-3 font-mono text-sm"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="cm" className="text-[13px] font-semibold">
                  Model
                </label>
                <select
                  id="cm"
                  defaultValue="claude-haiku-5-5"
                  className="h-11 rounded-[10px] border border-[#CBD5D1] bg-white px-3 font-mono text-sm"
                >
                  <option>claude-haiku-5-5</option>
                  <option>claude-sonnet-5-5</option>
                </select>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex-1 text-[13px] text-[#0B5E4E]">● เชื่อมต่อสำเร็จ</span>
                <button
                  type="button"
                  className="min-h-10 rounded-lg border border-[#CBD5D1] bg-white px-3.5 text-[13px]"
                >
                  ทดสอบ
                </button>
                <button
                  type="button"
                  className="min-h-10 rounded-lg border border-[#F1C9C4] bg-white px-3.5 text-[13px] text-[#B42318]"
                >
                  ลบ key
                </button>
              </div>
            </article>

            <article className="flex flex-col gap-3 rounded-[14px] border border-[#DDE3E1] p-4.5">
              <div className="flex items-center justify-between">
                <h3 className="m-0 text-base font-bold">
                  Gemini <span className="font-normal text-[#5B6B67]">· Google AI Studio</span>
                </h3>
                <button
                  type="button"
                  className="min-h-8 rounded-md border-0 bg-transparent px-2.5 text-[13px] font-semibold text-[#0B5E4E]"
                >
                  ตั้งเป็นค่าเริ่มต้น
                </button>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="gk" className="text-[13px] font-semibold">
                  API Key
                </label>
                <input
                  id="gk"
                  type="text"
                  defaultValue="AIza••••••••••••••••3kQ"
                  className="h-11 rounded-[10px] border border-[#CBD5D1] bg-[#F8FAF9] px-3 font-mono text-sm"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="gm" className="text-[13px] font-semibold">
                  Model
                </label>
                <select
                  id="gm"
                  defaultValue="gemini-2.5-flash"
                  className="h-11 rounded-[10px] border border-[#CBD5D1] bg-white px-3 font-mono text-sm"
                >
                  <option>gemini-2.5-flash</option>
                  <option>gemini-2.5-pro</option>
                </select>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex-1 text-[13px] text-[#0B5E4E]">● เชื่อมต่อสำเร็จ</span>
                <button
                  type="button"
                  className="min-h-10 rounded-lg border border-[#CBD5D1] bg-white px-3.5 text-[13px]"
                >
                  ทดสอบ
                </button>
                <button
                  type="button"
                  className="min-h-10 rounded-lg border border-[#F1C9C4] bg-white px-3.5 text-[13px] text-[#B42318]"
                >
                  ลบ key
                </button>
              </div>
            </article>
          </div>
          <button
            type="button"
            disabled
            className="w-fit min-h-10 rounded-lg border border-dashed border-[#A9B6B2] bg-[#F8FAF9] px-3.5 text-[13px] text-[#5B6B67]"
          >
            + เพิ่ม provider อื่น (เร็ว ๆ นี้)
          </button>
        </section>

        <section
          aria-labelledby="ph"
          className="flex flex-col gap-3.5 rounded-2xl border border-[#DDE3E1] bg-white p-6"
        >
          <div>
            <h2 id="ph" className="m-0 mb-1 text-lg font-bold">
              แหล่งรูปภาพสถานที่
            </h2>
            <p className="m-0 text-sm text-[#5B6B67]">
              ระบบเรียกตามลำดับจากบนลงล่าง ถ้าแหล่งแรกไม่พบรูปจะลองแหล่งถัดไป · ลากเพื่อจัดลำดับ
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 rounded-xl border border-[#E3E8E6] p-3.5">
            <span aria-hidden="true" className="font-mono text-[13px] text-[#5B6B67]">
              1
            </span>
            <div className="min-w-0 flex-1 basis-[260px]">
              <div className="flex flex-wrap items-center gap-2">
                <strong className="text-[15px]">Wikimedia Commons</strong>
                <span className="rounded-full bg-[#E1F3EE] px-2 py-0.5 text-[11px] font-semibold text-[#0B5E4E]">
                  ฟรี · ไม่ต้องใช้ key
                </span>
              </div>
              <p className="mt-0.5 mb-0 text-[13px] text-[#5B6B67]">
                ค้นจาก Wikidata (P18) + geosearch รอบพิกัด · แสดงเครดิต/ลิขสิทธิ์อัตโนมัติ
              </p>
            </div>
            <label className="flex min-h-11 items-center gap-2 text-[13px]">
              <input
                type="checkbox"
                role="switch"
                defaultChecked
                className="h-5 w-5 accent-[#0E7C66]"
              />
              เปิดใช้
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 rounded-xl border border-[#E3E8E6] p-3.5">
            <span aria-hidden="true" className="font-mono text-[13px] text-[#5B6B67]">
              2
            </span>
            <div className="flex min-w-0 flex-1 basis-[260px] flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <strong className="text-[15px]">Mapillary</strong>
                <span className="rounded-full bg-[#E1F3EE] px-2 py-0.5 text-[11px] font-semibold text-[#0B5E4E]">
                  ฟรี · ต้องใช้ access token
                </span>
              </div>
              <p className="m-0 text-[13px] text-[#5B6B67]">
                ภาพถนน/street-level รอบพิกัดสถานที่ (CC BY-SA)
              </p>
              <label htmlFor="mt" className="text-xs font-semibold">
                Access token
              </label>
              <input
                id="mt"
                type="text"
                defaultValue="MLY|••••••••••••"
                className="h-10 rounded-lg border border-[#CBD5D1] bg-[#F8FAF9] px-3 font-mono text-[13px]"
              />
            </div>
            <label className="flex min-h-11 items-center gap-2 text-[13px]">
              <input
                type="checkbox"
                role="switch"
                defaultChecked
                className="h-5 w-5 accent-[#0E7C66]"
              />
              เปิดใช้
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 rounded-xl border border-[#E3E8E6] p-3.5">
            <span aria-hidden="true" className="font-mono text-[13px] text-[#5B6B67]">
              3
            </span>
            <div className="min-w-0 flex-1 basis-[260px]">
              <div className="flex flex-wrap items-center gap-2">
                <strong className="text-[15px]">Unsplash</strong>
                <span className="rounded-full bg-[#E6EEFD] px-2 py-0.5 text-[11px] font-semibold text-[#1E40AF]">
                  ฟรี · มี rate limit
                </span>
              </div>
              <p className="mt-0.5 mb-0 text-[13px] text-[#5B6B67]">
                ภาพบรรยากาศทั่วไปตามชื่อ/แท็ก ไม่ใช่ภาพของสถานที่นั้นเสมอไป
              </p>
            </div>
            <label className="flex min-h-11 items-center gap-2 text-[13px]">
              <input type="checkbox" role="switch" className="h-5 w-5 accent-[#0E7C66]" />
              เปิดใช้
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 rounded-xl border border-dashed border-[#CBD5D1] bg-[#F8FAF9] p-3.5">
            <span aria-hidden="true" className="font-mono text-[13px] text-[#5B6B67]">
              4
            </span>
            <div className="flex min-w-0 flex-1 basis-[260px] flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <strong className="text-[15px]">Google Places Photos</strong>
                <span className="rounded-full bg-[#FDF0DC] px-2 py-0.5 text-[11px] font-semibold text-[#8A3B08]">
                  มีค่าใช้จ่าย · ตัวสำรอง
                </span>
              </div>
              <p className="m-0 text-[13px] text-[#5B6B67]">
                ใช้เมื่อแหล่งฟรีไม่พบรูป · cache รูปลง Vercel Blob เพื่อลดจำนวนการเรียก
              </p>
              <label htmlFor="gp" className="text-xs font-semibold">
                Google Maps Platform API key
              </label>
              <input
                id="gp"
                type="text"
                placeholder="ยังไม่ได้ตั้งค่า"
                className="h-10 rounded-lg border border-[#CBD5D1] bg-white px-3 font-mono text-[13px]"
              />
            </div>
            <label className="flex min-h-11 items-center gap-2 text-[13px]">
              <input type="checkbox" role="switch" className="h-5 w-5 accent-[#0E7C66]" />
              เปิดใช้
            </label>
          </div>
        </section>

        <section
          aria-labelledby="mp"
          className="flex flex-col gap-3.5 rounded-2xl border border-[#DDE3E1] bg-white p-6"
        >
          <h2 id="mp" className="m-0 text-lg font-bold">
            แผนที่
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3.5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="tile" className="text-[13px] font-semibold">
                สไตล์แผนที่ (OpenFreeMap)
              </label>
              <MapStyleSelect />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="center" className="text-[13px] font-semibold">
                ตำแหน่งเริ่มต้น
              </label>
              <select
                id="center"
                defaultValue="thailand"
                className="h-11 rounded-[10px] border border-[#CBD5D1] bg-white px-3 text-sm"
              >
                <option value="thailand">ประเทศไทยทั้งหมด</option>
                <option value="current">ตำแหน่งปัจจุบัน</option>
                <option value="recent">สถานที่ล่าสุด</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              className="min-h-11 rounded-[10px] border border-[#CBD5D1] bg-white px-4 text-sm"
            >
              ส่งออก GeoJSON
            </button>
            <button
              type="button"
              className="min-h-11 rounded-[10px] border border-[#CBD5D1] bg-white px-4 text-sm"
            >
              นำเข้าจาก Google Takeout (KML/GeoJSON)
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
