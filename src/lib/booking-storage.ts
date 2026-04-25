/** Browser session keys for the booking wizard (client-only). */
export const BK = {
  email: "cf_booking_email",
  balance: "cf_booking_balance",
  isNew: "cf_booking_is_new",
  lastBooking: "cf_booking_last",
} as const;

export type LastBooking = {
  startsAt: string;
  kind: string;
  id: string;
};

export function saveBookingSession(data: {
  email: string;
  creditBalance: number;
  isNew: boolean;
}) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(BK.email, data.email);
  sessionStorage.setItem(BK.balance, String(data.creditBalance));
  sessionStorage.setItem(BK.isNew, data.isNew ? "1" : "0");
}

export function readBookingEmail(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(BK.email);
}

export function readBookingBalance(): number | null {
  if (typeof window === "undefined") return null;
  const v = sessionStorage.getItem(BK.balance);
  if (v === null) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export function readBookingIsNew(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(BK.isNew) === "1";
}

export function saveLastBooking(b: LastBooking) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(BK.lastBooking, JSON.stringify(b));
}

export function readLastBooking(): LastBooking | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(BK.lastBooking);
    if (!raw) return null;
    return JSON.parse(raw) as LastBooking;
  } catch {
    return null;
  }
}

export function clearBookingSession() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(BK.email);
  sessionStorage.removeItem(BK.balance);
  sessionStorage.removeItem(BK.isNew);
  sessionStorage.removeItem(BK.lastBooking);
}

export function updateBalance(n: number) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(BK.balance, String(n));
}
