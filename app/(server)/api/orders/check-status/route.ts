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
    return NextResponse.json(orderData);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("error", error);
      return new Response(JSON.stringify(`${error.message}`), {
        status: 422,
      });
    } else {
      return new Response(JSON.stringify("Operation failed"), {
        status: 422,
      });
    }
  }
}
