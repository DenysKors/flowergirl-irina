import prisma from "@/lib/prisma";
import crypto from "crypto";

import { generateWayForPayRef } from "@/lib/utils";
import {
  CreateOrderPayload,
  ProdForSignature,
  ProdOrderItem,
} from "@/types/types";

export const prepaidOrderTemplate = async (order: CreateOrderPayload) => {
  const { customerData, products } = order;

  const publicId = null;
  const orderRef = generateWayForPayRef();
  const orderDate = Math.floor(Date.now() / 1000).toString();
  const merchantAccount = process.env.WAYFORPAY_MERCHANT_ACCOUNT;
  const merchantDomainName = process.env.NEXT_PUBLIC_SITE_URL;
  const secretKey = process.env.WAYFORPAY_SECRET_KEY;
  const prodDataForSignature: ProdForSignature[] = [];

  const createdOrder = await prisma.$transaction(async (tx) => {
    let totalOrderAmount = 0;
    const orderItemsToCreate: ProdOrderItem[] = [];

    for (const prod of products) {
      const product = await tx.product.findUnique({
        where: { id: prod.id },
      });

      if (!product) {
        throw new Error(`Товар з ID ${prod.id} не знайдено`);
      }

      if (product.qty < prod.qty) {
        throw new Error(
          `Недостатня кількість товара арт. ${product.sku} на складі. Сформуйте кошик заново.`
        );
      }

      if (Number(product.price) !== prod.price) {
        throw new Error(
          `Ціна товара арт. ${product.sku} змінилась. Сформуйте кошик заново.`
        );
      }

      const itemPrice = product.price.toNumber();
      const itemTotal = itemPrice * prod.qty;
      totalOrderAmount += itemTotal;

      prodDataForSignature.push({
        name: product.name,
        price: product.price.toNumber(),
        qty: prod.qty,
      });

      orderItemsToCreate.push({
        productId: product.id,
        qty: prod.qty,
        price: product.price,
        total: itemTotal,
      });
    }

    const newOrderTemplate = await tx.order.create({
      data: {
        orderRef,
        publicId,
        amount: totalOrderAmount,
        status: "pending",
        paymentType: "prepaid",
        customerLastName: customerData.lastName,
        customerFirstName: customerData.firstName,
        customerPhone: customerData.phoneNumber,
        comment: customerData.comment || null,
        postAddr: customerData.postLocation.postAddr,
        postName: customerData.postLocation.postName,
        items: {
          create: orderItemsToCreate,
        },
      },
      select: {
        orderRef: true,
        amount: true,
      },
    });

    if (!newOrderTemplate) {
      throw new Error(
        `Не вдалося сформувати Ваше замовлення. Повторіть, будь-ласка, ще раз.`
      );
    }

    return newOrderTemplate;
  });

  const amount = createdOrder.amount;
  const currency = "UAH";

  const stringToSign = [
    merchantAccount,
    merchantDomainName,
    orderRef,
    orderDate,
    amount,
    currency,
    prodDataForSignature.map((item) => item.name).join(";"),
    prodDataForSignature.map((item) => item.qty).join(";"),
    prodDataForSignature.map((item) => item.price).join(";"),
  ].join(";");

  const merchantSignature = crypto
    .createHmac("md5", secretKey!)
    .update(stringToSign, "utf8")
    .digest("hex");
  return {
    merchantAccount,
    merchantSignature,
    amount,
    orderDate,
    orderRef,
    productData: prodDataForSignature,
  };
};
