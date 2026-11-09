import type { Place, StatusKey, StatusMeta } from "./types";

export const STATUS: Record<StatusKey, StatusMeta> = {
  want: { label: "อยากไป", dot: "#2563EB", bg: "#E6EEFD", fg: "#1E40AF" },
  trip: { label: "อยู่ในทริปกำลังไป", dot: "#7C3AED", bg: "#EFE8FD", fg: "#5B21B6" },
  visited: { label: "ไปมาแล้ว", dot: "#0E7C66", bg: "#E1F3EE", fg: "#0B5E4E" },
  fav: { label: "สถานที่โปรด", dot: "#E8890C", bg: "#FDF0DC", fg: "#8A3B08" },
  never: { label: "ไปแล้วไม่ไปอีก", dot: "#64748B", bg: "#EDEFF2", fg: "#374151" },
};

export const STATUS_ORDER: StatusKey[] = ["want", "trip", "visited", "fav", "never"];

export const PLACES: Place[] = [
  { id: "p1", name: "วัดร่องขุ่น", prov: "เชียงราย", tags: ["วัด", "สถาปัตยกรรม"], status: "fav", lat: 19.8243, lng: 99.7631, note: "ไปช่วงเช้าก่อน 9 โมง คนน้อย แสงสวยถ่ายรูปได้ดี" },
  { id: "p9", name: "ภูชี้ฟ้า", prov: "เชียงราย", tags: ["ภูเขา", "จุดชมวิว"], status: "want", lat: 19.8536, lng: 100.4436, note: "ทะเลหมอกช่วง ธ.ค.–ม.ค. ต้องขึ้นก่อนพระอาทิตย์ขึ้น" },
  { id: "p6", name: "วัดพระธาตุดอยสุเทพ", prov: "เชียงใหม่", tags: ["วัด", "จุดชมวิว"], status: "visited", lat: 18.8049, lng: 98.9216, note: "ขึ้นบันไดนาคหรือกระเช้า วิวเมืองเชียงใหม่ตอนเย็น" },
  { id: "p2", name: "ดอยอินทนนท์", prov: "เชียงใหม่", tags: ["ภูเขา", "อุทยาน"], status: "trip", lat: 18.5883, lng: 98.4867, note: "ทริปปลายปี — จองที่พักกิ่วแม่ปานไว้แล้ว" },
  { id: "p7", name: "น้ำตกทีลอซู", prov: "ตาก", tags: ["น้ำตก", "อุทยาน"], status: "want", lat: 15.9356, lng: 98.7514, note: "เปิดเฉพาะหน้าแล้ง ต้องตรวจสอบประกาศอุทยานก่อนไป" },
  { id: "p10", name: "อุทยานแห่งชาติเขาใหญ่", prov: "นครราชสีมา", tags: ["อุทยาน", "ภูเขา"], status: "visited", lat: 14.4392, lng: 101.3725, note: "เจอช้างป่าที่ถนนธนะรัชต์ ขับช้า ๆ" },
  { id: "p3", name: "น้ำตกเอราวัณ", prov: "กาญจนบุรี", tags: ["น้ำตก", "อุทยาน"], status: "visited", lat: 14.3686, lng: 99.1442, note: "ชั้น 7 สวยสุด เตรียมรองเท้าเดินป่า" },
  { id: "p8", name: "ตลาดน้ำดำเนินสะดวก", prov: "ราชบุรี", tags: ["ตลาด"], status: "never", lat: 13.5197, lng: 99.9594, note: "นักท่องเที่ยวเยอะมาก ราคาสูง" },
  { id: "p4", name: "หาดไร่เลย์", prov: "กระบี่", tags: ["ทะเล", "จุดชมวิว"], status: "fav", lat: 8.0115, lng: 98.8378, note: "นั่งเรือหางยาวจากอ่าวนาง พระอาทิตย์ตกสวยมาก" },
  { id: "p5", name: "เกาะหลีเป๊ะ", prov: "สตูล", tags: ["ทะเล", "เกาะ"], status: "want", lat: 6.4886, lng: 99.3036, note: "ช่วงเปิดเกาะ พ.ย.–พ.ค." },
];

export function statusMeta(status: StatusKey): StatusMeta {
  return STATUS[status];
}

export type { StatusKey };
