import { compare, hash } from "bcryptjs";

export async function hashPassword(password: string) {
  return hash(password, 12);
}

export async function verifyPassword(password: string, passwordHash: string) {
  return compare(password, passwordHash);
}

export function validatePassword(password: string) {
  if (password.length < 8) return "Password must be at least 8 characters.";
  return null;
}

