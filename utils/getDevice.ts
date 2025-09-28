export type DeviceType = "mobile" | "tablet" | "desktop";

export function getDevice(ua: string | null | undefined): DeviceType {
  if (!ua) return "mobile";
  if (/Mobi|Android|iPhone/i.test(ua)) return "mobile";
  if (/iPad|Tablet/i.test(ua)) return "tablet";
  return "desktop";
}

