import type { Metadata } from "next";
import Link from "next/link";
import { PinMarkIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "PinMaps — เข้าสู่ระบบ",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-wrap">
      <div className="relative flex min-h-[22rem] flex-1 basis-[420px] flex-col justify-between overflow-hidden bg-[#0F1F1C] p-12 text-white">
        <svg
          viewBox="0 0 600 600"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
        >
          <g fill="none" stroke="#1F3631" strokeWidth="1.2">
            <path d="M-20 80 C120 40 220 140 360 100 S560 40 640 90" />
            <path d="M-20 160 C110 120 230 220 360 180 S560 120 640 170" />
            <path d="M-20 240 C120 200 220 300 360 260 S560 200 640 250" />
            <path d="M-20 320 C110 280 230 380 360 340 S560 280 640 330" />
            <path d="M-20 400 C120 360 220 460 360 420 S560 360 640 410" />
            <path d="M-20 480 C110 440 230 540 360 500 S560 440 640 490" />
          </g>
          <path
            d="M120 470 C200 380 260 420 320 330 S440 240 480 150"
            fill="none"
            stroke="#7FE0C6"
            strokeWidth="2.5"
            strokeDasharray="2 9"
            strokeLinecap="round"
          />
          <circle cx="120" cy="470" r="8" fill="#2563EB" stroke="#0F1F1C" strokeWidth="3" />
          <circle cx="320" cy="330" r="8" fill="#E8890C" stroke="#0F1F1C" strokeWidth="3" />
          <circle cx="480" cy="150" r="10" fill="#7FE0C6" stroke="#0F1F1C" strokeWidth="3" />
        </svg>

        <div className="relative flex items-center gap-2.5">
          <span className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-[#7FE0C6]">
            <PinMarkIcon size={20} className="text-[#0F1F1C]" />
          </span>
          <span className="text-xl font-bold">PinMaps</span>
        </div>

        <div className="relative max-w-[30rem]">
          <h1 className="mb-3 text-4xl leading-tight font-bold">
            ทุกที่ที่อยากไป
            <br />
            อยู่บนแผนที่เดียว
          </h1>
          <p className="m-0 text-base leading-relaxed text-[#C5D6D1]">
            จัดเป็นจังหวัด ติดแท็ก ตั้งสถานะ และให้ AI ช่วยเพิ่มสถานที่จากข้อความรีวิวหรือแผนทริป
          </p>
        </div>
      </div>

      <main className="flex flex-1 basis-[420px] items-center justify-center p-12 px-6">
        <form className="flex w-full max-w-[400px] flex-col gap-[18px]">
          <div>
            <h2 className="m-0 mb-1.5 text-2xl font-bold">เข้าสู่ระบบ</h2>
            <p className="m-0 text-sm text-[#5B6B67]">แอปส่วนตัว — ผู้ใช้เดียว</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="u" className="text-[13px] font-semibold">
              ชื่อผู้ใช้
            </label>
            <input
              id="u"
              type="text"
              defaultValue="admin"
              autoComplete="username"
              className="h-12 rounded-[10px] border border-[#CBD5D1] bg-white px-3.5 text-[15px]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="pw" className="text-[13px] font-semibold">
              รหัสผ่าน
            </label>
            <input
              id="pw"
              type="password"
              defaultValue="changeme"
              autoComplete="current-password"
              className="h-12 rounded-[10px] border border-[#CBD5D1] bg-white px-3.5 text-[15px]"
            />
          </div>

          <p className="m-0 rounded-[10px] bg-[#E6EEFD] px-3.5 py-3 text-[13px] leading-relaxed text-[#1E3A8A]">
            เข้าครั้งแรกใช้รหัสผ่าน{" "}
            <code className="rounded bg-white px-1.5 py-px font-mono">changeme</code> ระบบจะพาไปหน้าเปลี่ยนรหัสผ่านทันที
          </p>

          <Link
            href="/settings"
            className="flex min-h-12 items-center justify-center rounded-xl bg-[#0E7C66] text-[15px] font-semibold text-white no-underline"
          >
            เข้าสู่ระบบ
          </Link>

          <p className="m-0 text-center text-xs text-[#5B6B67]">
            จำกัด 5 ครั้ง / 15 นาที ต่อ IP · session แบบ HttpOnly cookie
          </p>
        </form>
      </main>
    </div>
  );
}
