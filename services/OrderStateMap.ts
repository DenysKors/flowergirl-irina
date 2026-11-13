import type { OrderStatus } from "@/prisma/generated/client";

export const ALLOWED_STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending: ["processing"],
  processing: ["shipped", "cancelled"],
  paid: ["processing"],
  shipped: ["completed", "cancelled"],
  completed: [],
  cancelled: [],
  failed: ["pending"],
};
