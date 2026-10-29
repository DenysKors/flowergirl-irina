import prisma from "@/lib/prisma";

import { generatePublicId } from "@/lib/utils";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const prepaidOrderSuccess = async (
  orderReference: string,
  amount: string | number,
  data: any
) => {
  let publicId = generatePublicId();

  const isExist = await prisma.order.findUnique({ where: { publicId } });
  if (isExist) publicId = generatePublicId();

  await prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { orderRef: orderReference },
      include: { items: true },
    });

    if (!order) {
      throw new Error(`Замовлення ${orderReference} не знайдено`);
    }

    if (order.amount.toNumber() !== Number(amount)) {
      throw new Error(`Сума замовлення ${orderReference} не співпадає`);
    }

    if (order.status === "paid") {
      console.log(`Замовлення ${orderReference} вже оброблене.`);
      return;
    }

    for (const item of order.items) {
      await tx.product.update({
        where: { id: item.productId },
        data: {
          qty: {
            decrement: item.qty,
          },
        },
      });
    }

    await tx.order.update({
      where: { id: order.id },
      data: {
        publicId,
        status: "paid",
      },
    });

    await tx.paymentTransaction.create({
      data: {
        orderId: order.id,
        rawResponse: data,
      },
    });
  });
};
/* eslint-disable @typescript-eslint/no-explicit-any */
