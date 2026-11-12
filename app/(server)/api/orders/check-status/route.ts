import { NextResponse, NextRequest } from "next/server";

import { checkPaidOrderStatus } from "@/lib/api";

export async function POST(request: NextRequest) {
  const { orderReference } = await request.json();

  if (!orderReference) {
    return NextResponse.json(
      { error: "Missed orderReference" },
      { status: 400 }
    );
  }

  try {
    const orderData = await checkPaidOrderStatus(orderReference);

    if (orderData.status === "paid" || orderData.status === "failed" || orderData.status === "pending") { return NextResponse.json(orderData); }
    else if (orderData.status === "shipped" || orderData.status === "completed") {
      orderData.status = "paid";
      return NextResponse.json(orderData);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("error", error);
      return new Response(JSON.stringify(`${error.message}`), {
        status: 404,
      });
    } else {
      return new Response(JSON.stringify("Operation failed"), {
        status: 422,
      });
    }
  }
}
