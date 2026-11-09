import Link from "next/link";
import { PinMarkIcon, SparkleIcon } from "./icons";

type NavKey = "map" | "graph" | "settings";

const NAV: { key: NavKey; href: string; label: string }[] = [
  { key: "map", href: "/", label: "แผนที่" },
  { key: "graph", href: "/graph", label: "กราฟความสัมพันธ์" },
  { key: "settings", href: "/settings", label: "ตั้งค่า" },
];

export function AppHeader({
  active,
  showAddCta = true,
}: {
  active?: NavKey;
  showAddCta?: boolean;
}) {
  return (
    <header className="flex flex-wrap items-center gap-4 px-6 py-3 bg-white border-b border-[#DDE3E1]">
      <Link href="/" className="flex items-center gap-2.5 no-underline text-[#0F1F1C]">
        <span className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-[#0F1F1C]">
          <PinMarkIcon size={18} className="text-[#7FE0C6]" />
        </span>
        <span className="text-lg font-bold tracking-tight">PinMaps</span>
      </Link>

      <nav aria-label="เมนูหลัก" className="flex flex-wrap gap-1">
        {NAV.map((item) => {
          const isActive = item.key === active;
          return (
            <Link
              key={item.key}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={
                "rounded-lg px-3.5 py-2.5 text-sm no-underline " +
                (isActive
                  ? "bg-[#E1F3EE] font-semibold text-[#0B5E4E]"
                  : "font-medium text-[#3D4D49]")
              }
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex-1 min-w-[40px]" />

      {showAddCta && (
        <Link
          href="/add"
          className="inline-flex min-h-11 items-center gap-2 rounded-[10px] bg-[#0E7C66] px-4 text-sm font-semibold text-white no-underline"
        >
          <SparkleIcon size={16} />
          เพิ่มด้วย AI
        </Link>
      )}

      <Link
        href="/login"
        aria-label="บัญชี admin — ออกจากระบบ"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0F1F1C] text-[15px] font-semibold text-white no-underline"
      >
        F
      </Link>
    </header>
  );
}
