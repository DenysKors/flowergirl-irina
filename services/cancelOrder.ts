import prisma from "@/lib/prisma";
import { OrderStatus } from "@/prisma/generated/client";

export const cancelOrder = async (id: number) => {
  return prisma.$transaction(async (tx) => {
    const { count } = await tx.order.updateMany({
      where: { id, status: { not: OrderStatus.cancelled } },
      data: { status: OrderStatus.cancelled },
    });

    if (count === 0) {
      throw new Error(`Заказ ID ${id} не найден или уже отменён`);
    }

    const order = await tx.order.findUniqueOrThrow({
      where: { id },
      select: { id: true, status: true, items: true },
    });

    for (const item of order.items) {
      await tx.product.updateMany({
        where: { id: item.productId, isDeleted: false },
        data: { qty: { increment: item.qty } },
      });
    }

    return { id: order.id, status: order.status };
  });
};
