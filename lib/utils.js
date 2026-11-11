import crypto from "crypto";

export function generateWayForPayRef() {
  const timestamp = Math.floor(Date.now() / 1000);
  const random = crypto.randomInt(100, 1000);
  return `WFP-${timestamp}-${random}`;
}

export function generatePublicId() {
  const date = new Date();
  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  const random = crypto.randomInt(100, 1000);
  return `FIO-${yy}${mm}${dd}-${random}`;
}

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password, storedHash) {
  const [salt, originalHash] = storedHash.split(":");

  const currentHash = crypto.scryptSync(password, salt, 64).toString("hex");

  return crypto.timingSafeEqual(
    Buffer.from(originalHash, "hex"),
    Buffer.from(currentHash, "hex")
  );
}