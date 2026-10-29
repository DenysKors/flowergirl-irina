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
  return `FI-${yy}${mm}${dd}-${random}`;
}
