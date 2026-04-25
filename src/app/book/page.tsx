import type { Metadata } from "next";
import { BookClient } from "./BookClient";

export const metadata: Metadata = {
  title: "Book a session | Clearfield",
  description: "Schedule Microsoft 365 / Modern Work consulting with Clearfield.",
};

export default function BookPage() {
  return <BookClient />;
}
