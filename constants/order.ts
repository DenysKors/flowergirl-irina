import type { OrderStatus } from "@/prisma/generated/client";

// If changed, Prisma schema OrderStatus enum update needed!
export const PAYMENT_TYPE = {
  PREPAID: "prepaid",
  POSTPAID: "postpaid",
} as const;

// If changed, Prisma schema OrderStatus enum update needed!
export const ORDER_STATUS_TYPE: Record<OrderStatus, string> = {
  pending: "НЕОБРАБОТАН",
  processing: "В РАБОТЕ",
  shipped: "ОТПРАВЛЕН",
  completed: "ЗАВЕРШЕН",
  cancelled: "ОТМЕНЕН",
  paid: "ОПЛАЧЕН",
  failed: "С ОШИБКОЙ",
} as const;

export const PAYMENT_STATUS_TYPE = {
  prepaid: "Предоплата",
  postpaid: "При получении",
} as const;
