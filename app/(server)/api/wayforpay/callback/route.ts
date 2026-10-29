import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

import { prepaidOrderSuccess } from "@/services/prepaidOrderSuccess";
import { prepaidOrderFail } from "@/services/prepaidOrderFail";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const {
      merchantAccount,
      orderReference,
      amount,
      currency,
      authCode,
      cardPan,
      transactionStatus,
      reasonCode,
      merchantSignature: incomingSignature,
    } = data;

    const signString = [
      merchantAccount,
      orderReference,
      amount,
      currency,
      authCode,
      cardPan,
      transactionStatus,
      reasonCode,
    ].join(";");

    const SECRET_KEY = process.env.WAYFORPAY_SECRET_KEY;

    const expectedSignature = crypto
      .createHmac("md5", SECRET_KEY!)
      .update(signString, "utf8")
      .digest("hex");

    if (incomingSignature !== expectedSignature) {
      console.error("Помилка безпеки: підписи не співпадають!");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    if (transactionStatus === "Approved") {
      prepaidOrderSuccess(orderReference, amount, data);
    } else if (transactionStatus === "Declined") {
      prepaidOrderFail(orderReference, data);
    } else {
      console.log(
        `Замовлення ${orderReference} не оплачено. Статус: ${transactionStatus}`
      );
    }

    const responseStatus = "accept";
    const responseTime = Math.floor(Date.now() / 1000);
    const responseSignString = `${orderReference};${responseStatus};${responseTime}`;
    const responseSignature = crypto
      .createHmac("md5", SECRET_KEY!)
      .update(responseSignString, "utf8")
      .digest("hex");

    return NextResponse.json({
      orderReference,
      status: responseStatus,
      time: responseTime,
      signature: responseSignature,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("error", error);
      return new Response(JSON.stringify(`${error.message}`), {
        status: 422,
      });
    } else {
      console.error("Помилка обробки callback WayForPay:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}
