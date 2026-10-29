import prisma from "@/lib/prisma";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const prepaidOrderFail = async (orderReference: string, data: any) => {
  await prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { orderRef: orderReference },
    });

    if (!order) {
      throw new Error(`Замовлення ${orderReference} не знайдено`);
    }

    if (order.status === "paid") {
      console.log(`Замовлення ${orderReference} вже оброблене.`);
      return;
    }

    await tx.order.update({
      where: { id: order.id },
      data: {
        status: "failed",
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
